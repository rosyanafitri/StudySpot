export interface StudySpot {
  id: string;
  name: string;
  rating: number;
  noiseLevel: 'Tenang Banget 🤫' | 'Sedang ☕' | 'Ramai 🥳';
  hasAC: boolean;
  powerOutlets: 'Banyak 🔌' | 'Sedikit ⚡' | 'Gak Ada ❌';
  wifiQuality: 'Ngebut 🚀' | 'Lumayan 📶' | 'Lemot 🐢';
  category: string;
  emoji: string;
}