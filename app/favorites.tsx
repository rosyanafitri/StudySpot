import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { STUDY_SPOTS } from '../constants/mockData';
import { StudySpotCard } from '../components/StudySpotCard';

export default function FavoritesPage() {
  const router = useRouter();

  // Sementara menampilkan spot favorit dari mockData
  // Nanti dapat disesuaikan dengan state global / storage
  const favoriteSpots = STUDY_SPOTS.filter((spot) => spot.rating >= 4.7);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Spot Favorit Pilihan Kamu 💖</Text>

      <FlatList
        data={favoriteSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudySpotCard spot={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada spot favorit yang ditambahkan 🌸</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>⬅️ Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FFE4E8',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    color: '#FF6B81',
    fontWeight: 'bold',
    fontSize: 14,
  },
});