import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { STUDY_SPOTS } from '../constants/mockData';
import { StudySpotCard } from '../components/StudySpotCard';
import { spotStyles } from '../styles/spotStyles';

export default function IndexPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpots = STUDY_SPOTS.filter((spot) =>
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

      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudySpotCard spot={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Spot nugas tidak ditemukan 🌸</Text>
        }
      />
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
});