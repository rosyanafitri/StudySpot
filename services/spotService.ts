
import { StudySpot } from '../types/spot';
import { ApiResponse } from '../types/api';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Custom Async Function: mengambil daftar StudySpot
export const getStudySpots = async (): Promise<ApiResponse<StudySpot[]>> => {
  try {
    // Pre-built Async Function: fetch()
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    // Mengubah response API menjadi JSON
    const rawData = await response.json();

    // Konfigurasi data tambahan StudySpot
    const spotConfigs = [
      {
        emoji: '☕',
        noiseLevel: 'Tenang Banget 🤫' as const,
        hasAC: true,
        powerOutlets: 'Banyak 🔌' as const,
        wifiQuality: 'Ngebut 🚀' as const,
        rating: 4.8,
        category: 'Cafe Co-Working',
      },
      {
        emoji: '📚',
        noiseLevel: 'Tenang Banget 🤫' as const,
        hasAC: true,
        powerOutlets: 'Banyak 🔌' as const,
        wifiQuality: 'Lumayan 📶' as const,
        rating: 4.9,
        category: 'Perpustakaan',
      },
      {
        emoji: '🍃',
        noiseLevel: 'Ramai 🥳' as const,
        hasAC: false,
        powerOutlets: 'Sedikit ⚡' as const,
        wifiQuality: 'Lumayan 📶' as const,
        rating: 4.5,
        category: 'Area Terbuka',
      },
      {
        emoji: '🏢',
        noiseLevel: 'Sedang ☕' as const,
        hasAC: true,
        powerOutlets: 'Banyak 🔌' as const,
        wifiQuality: 'Ngebut 🚀' as const,
        rating: 4.7,
        category: 'Workspace',
      },
      {
        emoji: '🍰',
        noiseLevel: 'Sedang ☕' as const,
        hasAC: true,
        powerOutlets: 'Sedikit ⚡' as const,
        wifiQuality: 'Lumayan 📶' as const,
        rating: 4.6,
        category: 'Cafe',
      },
    ];

    // Memetakan data API ke struktur StudySpot
    const mappedSpots: StudySpot[] = rawData
      .slice(0, 5)
      .map((item: any, index: number) => {
        const config = spotConfigs[index];

        return {
          id: String(item.id),
          name:
            item.title.length > 30
              ? item.title.substring(0, 30) + '...'
              : item.title,
          ...config,
        };
      });

    return {
      success: true,
      message: 'Berhasil mengambil data dari API',
      data: mappedSpots,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Gagal terhubung ke API',
      data: [],
    };
  }
};

// Custom Async Function: mengambil detail berdasarkan ID
export const getStudySpotById = async (
  id: string
): Promise<ApiResponse<StudySpot | null>> => {
  try {
    const response = await getStudySpots();

    if (!response.success) {
      return {
        success: false,
        message: response.message,
        data: null,
      };
    }

    const spot = response.data.find((item) => item.id === id) ?? null;

    return {
      success: spot !== null,
      message: spot
        ? 'Detail spot ditemukan'
        : 'Spot tidak ditemukan',
      data: spot,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Gagal mengambil detail spot',
      data: null,
    };
  }
};
