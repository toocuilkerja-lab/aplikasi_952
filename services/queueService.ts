import { QueueInfo } from '../types';

/**
 * DATABASE: GOOGLE SHEETS
 * SPREADSHEET_ID: 1GMzLoSCc2ROpzRmeXbbOkwrS8nsJzF6mLJHXwEz8grg
 * Pengaturan: Pastikan Sheet "Anyone with the link can view"
 */
const SPREADSHEET_ID = '1GMzLoSCc2ROpzRmeXbbOkwrS8nsJzF6mLJHXwEz8grg';

export const INITIAL_DATA: QueueInfo[] = [
  { id: 'A', label: 'Permohonan', description: '', current: 'A000', last: 'A000', color: 'bg-blue-600', location: '-' },
  { id: 'B', label: 'Coretax', description: '', current: 'B000', last: 'B000', color: 'bg-emerald-600', location: '-' },
  { id: 'C', label: 'Helpdesk', description: '', current: 'C000', last: 'C000', color: 'bg-orange-500', location: '-' },
  { id: 'D', label: 'Lainnya', description: '', current: 'D000', last: 'D000', color: 'bg-purple-600', location: '-' }
];

const formatQueueNumber = (val: any, prefix: string): string => {
  if (!val) return `${prefix}000`;
  const strVal = val.toString();
  if (strVal.toUpperCase().startsWith(prefix.toUpperCase())) return strVal.toUpperCase();
  const num = parseInt(strVal.replace(/[^0-9]/g, '')) || 0;
  return `${prefix}${num.toString().padStart(3, '0')}`;
};

/**
 * Mengambil data secara real-time dari Public Google Sheet (Read-Only)
 */
const fetchFromPublicSheet = async (): Promise<QueueInfo[] | null> => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil data dari Google Sheets");
    
    const text = await response.text();
    const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const json = JSON.parse(jsonStr);
    const rows = json.table.rows;

    if (!rows || rows.length === 0) return null;

    return rows.map((row: any, index: number) => {
      const cols = row.c;
      const id = cols[0]?.v?.toString() || INITIAL_DATA[index]?.id || 'X';
      const label = cols[1]?.v?.toString() || INITIAL_DATA[index]?.label || 'Layanan';
      
      return {
        id,
        label,
        description: '',
        last: formatQueueNumber(cols[2]?.v, id),
        current: formatQueueNumber(cols[3]?.v, id),
        location: cols[4]?.v?.toString() || '-',
        color: INITIAL_DATA.find(d => d.id === id)?.color || 'bg-slate-600'
      };
    });
  } catch (e) {
    console.error("Queue Sync Error:", e);
    return null;
  }
};

export const fetchQueueData = async (): Promise<QueueInfo[]> => {
  const publicData = await fetchFromPublicSheet();
  if (publicData) {
    localStorage.setItem('jyp_queue_cache', JSON.stringify(publicData));
    return publicData;
  }
  const cached = localStorage.getItem('jyp_queue_cache');
  return cached ? JSON.parse(cached) : INITIAL_DATA;
};

export const updateSingleQueueSheet = async (id: string, type: 'current' | 'last'): Promise<boolean> => {
  // Update lokal agar UI tetap responsif
  const currentCache = localStorage.getItem('jyp_queue_cache');
  const currentData = currentCache ? JSON.parse(currentCache) : INITIAL_DATA;
  const updated = currentData.map((q: any) => {
    if (q.id === id) {
      const val = q[type];
      const numOnly = parseInt(val.replace(/[^0-9]/g, '')) + 1;
      const newVal = `${id}${numOnly.toString().padStart(3, '0')}`;
      return { ...q, [type]: newVal };
    }
    return q;
  });
  localStorage.setItem('jyp_queue_cache', JSON.stringify(updated));
  return true;
};