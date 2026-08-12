import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

type HeaderProps = {
  onSkipPress: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
};

export default function OnboardingHeader({ onSkipPress, onBackPress, showBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <View /> // Empty view to keep space-between working
      )}
      <TouchableOpacity onPress={onSkipPress} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    minHeight: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: -8, // visually align left
  },
  skipButton: {
    padding: 8,
    marginRight: -8, // visually align right
  },
  skipText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
