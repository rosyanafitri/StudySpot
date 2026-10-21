import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { STUDY_SPOTS } from '../constants/mockData';
import { StudySpotCard } from '../components/StudySpotCard';
import { spotStyles } from '../styles/spotStyles';

export default function IndexPage() {
  // Hook useState untuk menyimpan keyword pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data spot berdasarkan input pencarian
  const filteredSpots = STUDY_SPOTS.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={spotStyles.container}>
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