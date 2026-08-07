import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

type BottomCardProps = {
  text: string;
  activeDotIndex: number;
  onNextPress: () => void;
};

export default function OnboardingBottomCard({ text, activeDotIndex, onNextPress }: BottomCardProps) {
  return (
    <View style={styles.bottomCard}>
      <View style={styles.cardContentRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.cardText}>{text}</Text>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, activeDotIndex === 0 && styles.activeDot]} />
            <View style={[styles.dot, activeDotIndex === 1 && styles.activeDot]} />
            <View style={[styles.dot, activeDotIndex === 2 && styles.activeDot]} />
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.8}
          onPress={onNextPress}
        >
          <Feather name="arrow-right" size={24} color={Colors.background.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomCard: {
    backgroundColor: Colors.background.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 50,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 20,
  },
  cardContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    paddingRight: 16,
  },
  cardText: {
    fontSize: 18,
    color: Colors.text.cardDark,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background.dotInactive,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  }
});
