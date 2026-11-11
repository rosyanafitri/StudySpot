import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StudySpot } from '../types/spot';
import { getStudySpots } from '../services/spotService';
import { StudySpotCard } from '../components/StudySpotCard';
import { spotStyles } from '../styles/spotStyles';

export default function IndexPage() {
  const router = useRouter();
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // 🟢 Panggil API eksternal saat komponen pertama kali dirender
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
  }, []);

  const filteredSpots = spots.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={spotStyles.container}>
      {/* Tombol Akses ke Halaman Favorit */}
      <TouchableOpacity
        style={styles.favNavButton}
        onPress={() => router.push('/favorites')}
      >
        <Text style={styles.favNavText}>💖 Lihat Spot Favorit Saya</Text>
      </TouchableOpacity>

      {/* Search Bar Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Cari spot nugas kesukaanmu..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <Text style={styles.sectionTitle}>Daftar Rekomendasi Spot:</Text>

      {/* Status Loading */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B81" />
          <Text style={styles.loadingText}>Memuat spot nugas dari server...</Text>
        </View>
      ) : errorMsg ? (
        /* Status Error */
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        /* Status Sukses - Data dari API */
        <FlatList
          data={filteredSpots}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudySpotCard spot={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Spot nugas tidak ditemukan 🌸</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  favNavButton: {
    backgroundColor: '#FF6B81',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  favNavText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#FFE4E8',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 12,
    paddingLeft: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 20,
    fontSize: 14,
  },
  loadingContainer: {
    paddingVertical: 40,
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
});