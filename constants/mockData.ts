import { StudySpot } from '../types/spot';

export const STUDY_SPOTS: StudySpot[] = [
  {
    id: '1',
    name: 'Perpustakaan Pusat UMM',
    rating: 4.9,
    noiseLevel: 'Tenang Banget 🤫',
    hasAC: true,
    powerOutlets: 'Banyak 🔌',
    wifiQuality: 'Ngebut 🚀',
    category: 'Perpustakaan',
    emoji: '📚',
  },
  {
    id: '2',
    name: 'Kopi Karsa & Workspace',
    rating: 4.8,
    noiseLevel: 'Sedang ☕',
    hasAC: true,
    powerOutlets: 'Banyak 🔌',
    wifiQuality: 'Ngebut 🚀',
    category: 'Cafe Co-Working',
    emoji: '🧋',
  },
  {
    id: '3',
    name: 'Taman Gazebo Kampus',
    rating: 4.5,
    noiseLevel: 'Ramai 🥳',
    hasAC: false,
    powerOutlets: 'Sedikit ⚡',
    wifiQuality: 'Lumayan 📶',
    category: 'Area Terbuka',
    emoji: '🍃',
  },
];