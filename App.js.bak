import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { STUDY_SPOTS } from './constants/mockData';
import { StudySpotCard } from './components/StudySpotCard';
import { spotStyles } from './styles/spotStyles';

export default function App() {
  return (
    <View style={spotStyles.container}>
      <View style={spotStyles.headerBox}>
        <Text style={spotStyles.headerTitle}>StudySpot ✨</Text>
        <Text style={spotStyles.headerSubtitle}>
          Tempat Nugas Paling Keren & Nyaman! 🎀
        </Text>
      </View>

      {/* Teks dengan Internal Styling (Materi 3.1) */}
      <Text style={internalStyles.sectionTitle}>Daftar Rekomendasi Spot:</Text>

      <FlatList
        data={STUDY_SPOTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudySpotCard spot={item} />}
        showsVerticalScrollIndicator={false}
      />

      <Text style={internalStyles.sectionTitle}>HELLO WORD</Text>
    </View>
  );
}

// Internal Styling (Materi 3.1 di Modul)
const internalStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 12,
    paddingLeft: 4,
  },
});

