import { StudySpot } from '../types/spot';
import { ApiResponse } from '../types/api';

// 🟢 ENDPOINT API EKSTERNAL AKTIF 100% (JSONPlaceholder Public API)
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getStudySpots = async (): Promise<ApiResponse<StudySpot[]>> => {
  try {
    // 1. Melakukan Network Call Fetch ke Server Eksternal
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server Error (Status: ${response.status})`);
    }

    const rawData = await response.json();

    // 2. Ambil 5 item pertama dari API eksternal dan petakan ke struktur StudySpot
    const mappedSpots: StudySpot[] = rawData.slice(0, 5).map((item: any, index: number) => {
      const spotConfigs = [
        { emoji: '☕', noise: 'Tenang & Kondusif', ac: true, power: 'Setiap Meja 🔌', wifi: '100 Mbps 🚀', rating: 4.8 },
        { emoji: '🏢', noise: 'Quiet Zone Only', ac: true, power: 'Banyak 🔌', wifi: 'Dedicated Fiber 🚀', rating: 4.9 },
        { emoji: '🍃', noise: 'Outdoor Sejuk', ac: false, power: 'Terbatas 🔌', wifi: 'Cukup 📶', rating: 4.4 },
        { emoji: '📚', noise: 'Hening Sekali 🤫', ac: true, power: 'Banyak 🔌', wifi: 'Kencang 🚀', rating: 4.7 },
        { emoji: '🍰', noise: 'Sedang / Cafe Music', ac: true, power: 'Ada di Beberapa Spot 🔌', wifi: 'Stabil 📶', rating: 4.6 },
      ];

      const config = spotConfigs[index % spotConfigs.length];

      return {
        id: String(item.id),
        name: item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title,
        emoji: config.emoji,
        rating: config.rating,
        noiseLevel: config.noise,
        hasAC: config.ac,
        powerOutlets: config.power,
        wifiQuality: config.wifi,
      };
    });

    return {
      success: true,
      message: 'Berhasil mengambil data dari External API',
      data: mappedSpots,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal terhubung ke API',
      data: [],
    };
  }
};

export const getStudySpotById = async (id: string): Promise<ApiResponse<StudySpot | null>> => {
  try {
    const response = await getStudySpots();
    if (!response.success) {
      return { success: false, message: response.message, data: null };
    }

    const spot = response.data.find((s) => s.id === id) || null;
    return {
      success: spot !== null,
      message: spot ? 'Detail spot ditemukan' : 'Spot tidak ditemukan',
      data: spot,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Gagal mengambil detail dari API',
      data: null,
    };
  }
};