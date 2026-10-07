import { StyleSheet } from 'react-native';

export const spotStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7', // Soft Pastel Pink
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerBox: {
    backgroundColor: '#FFE4E8',
    padding: 18,
    borderRadius: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFB6C1',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6B81',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#FF85A1',
    marginTop: 4,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFD1DC',
    shadowColor: '#FFA6C9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  badgeRating: {
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF6B81',
  },
  gridInfo: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 10,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
});