import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StudySpot } from '../types/spot';
import {
  getStudySpots,
  searchExternalSpots,
  openLocationInMap,
  ExternalSpot,
} from '../services/spotService';
import { StudySpotCard } from '../components/StudySpotCard';

export default function IndexPage() {
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // 🟢 State Tambahan Khusus External API
  const [extQuery, setExtQuery] = useState('cafe malang');
  const [extSpots, setExtSpots] = useState<ExternalSpot[]>([]);
  const [extLoading, setExtLoading] = useState(false);
  const [hasSearchedExt, setHasSearchedExt] = useState(false);

  const bannerImages = [
    {
      id: '1',
      title: 'Perpustakaan Pusat UMM',
      image:
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Kopi Karsa & Workspace',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'Taman Gazebo Kampus',
      image:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
    },
  ];

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      setErrorMsg('');
      const response = await getStudySpots();

      if (response.success) {
        setSpots(response.data);
      } else {
        setErrorMsg(response.message);
      }
      setLoading(false);
    };

    fetchSpots();
    // Otomatis muat data awal eksternal
    handleSearchExternal('cafe malang');
  }, []);

  // Handler Pencarian External API
  const handleSearchExternal = async (text: string) => {
    if (!text.trim()) return;
    setExtLoading(true);
    setHasSearchedExt(true);
    const results = await searchExternalSpots(text);
    setExtSpots(results);
    setExtLoading(false);
  };

  const filteredSpots = spots.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🌸 Temukan Tempat Nugas Idealmu</Text>
          </View>
          <Text style={styles.heroTitle}>Your Spot. Your Focus. Your Day.</Text>
          <Text style={styles.heroSubtitle}>
            Jelajahi berbagai kafe, perpustakaan, dan area nugas paling nyaman dengan fasilitas terbaik.
          </Text>
        </View>

        {/* Featured Banner Cafe (Rata Tengah) */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, styles.textCenter]}>
            Spot Favorit Minggu Ini ☕
          </Text>
          <View style={styles.bannerCenterWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bannerScroll}
            >
              {bannerImages.map((item) => (
                <View key={item.id} style={styles.bannerCard}>
                  <Image source={{ uri: item.image }} style={styles.bannerImage} />
                  <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerText}>{item.title}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Search Bar Input */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Cari nama tempat, kampus, atau area nugas..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Daftar Spot Rekomendasi Utama */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Daftar Rekomendasi Spot</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B81" />
              <Text style={styles.loadingText}>Memuat spot nugas...</Text>
            </View>
          ) : errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : filteredSpots.length === 0 ? (
            <Text style={styles.emptyText}>Spot nugas tidak ditemukan 🌸</Text>
          ) : (
            filteredSpots.map((item) => (
              <StudySpotCard key={item.id} spot={item} />
            ))
          )}
        </View>

        {/* 🟢 FITUR BARU: Seksi Pencarian External API (Tepat di Bagian Bawah) */}
        <View style={styles.externalCardContainer}>
          <Text style={styles.externalTitle}>
            🌏 Temukan Tempat Belajar di Sekitarmu
          </Text>
          <Text style={styles.externalSubtitle}>
            Cari perpustakaan, kafe, atau tempat belajar berdasarkan nama dan kota. Data diambil langsung dari OpenStreetMap.
          </Text>

          <TextInput
            style={styles.externalInput}
            placeholder="Cari nama tempat, kampus, atau area nugas..."
            placeholderTextColor="#888"
            value={extQuery}
            onChangeText={setExtQuery}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearchExternal(extQuery)}
          >
            <Text style={styles.searchButtonText}>Cari dari External API</Text>
          </TouchableOpacity>

          {hasSearchedExt && (
            <Text style={styles.resultCountText}>
              Hasil pencarian ({extSpots.length}):
            </Text>
          )}

          {extLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FF6B81" />
            </View>
          ) : (
            extSpots.map((item) => (
              <View key={item.id} style={styles.extCard}>
                <View style={styles.extCardHeader}>
                  <Text style={styles.extSpotName}>📍 {item.name}</Text>
                  <TouchableOpacity
                    onPress={() => openLocationInMap(item.lat, item.lon, item.name)}
                  >
                    <Text style={styles.mapLink}>Lihat peta ↗</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.extAddressText}>{item.address}</Text>
                <Text style={styles.extCategoryText}>
                  Kategori: {item.category}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF9FA',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
  },
  heroBadge: {
    backgroundColor: '#FFE4E8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#FF6B81',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222222',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 520,
    lineHeight: 20,
  },

  // Banner Section (Centered)
  sectionContainer: {
    marginBottom: 28,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  bannerCenterWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  bannerScroll: {
    gap: 16,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  bannerCard: {
    width: 220,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EEEEEE',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 8,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Search Section
  searchSection: {
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#FFE4E8',
    color: '#333333',
  },

  // List Section
  listSection: {
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 20,
    fontSize: 14,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FF6B81',
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 14,
  },

  // 🟢 Styling Seksi External API
  externalCardContainer: {
    backgroundColor: '#FFEBF0',
    borderRadius: 20,
    padding: 20,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#FFD6E0',
  },
  externalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E84A5F',
    marginBottom: 6,
  },
  externalSubtitle: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 18,
  },
  externalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#FFE4E8',
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#FF6B81',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultCountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 12,
  },

  // Style Card Hasil API Eksternal
  extCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFE4E8',
  },
  extCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  extSpotName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  mapLink: {
    color: '#FF6B81',
    fontWeight: '700',
    fontSize: 13,
  },
  extAddressText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 17,
    marginBottom: 6,
  },
  extCategoryText: {
    fontSize: 12,
    color: '#888888',
  },
});