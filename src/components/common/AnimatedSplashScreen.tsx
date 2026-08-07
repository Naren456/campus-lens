import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen({ children, isAppReady }: { children: React.ReactNode, isAppReady: boolean }) {
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  
  const opacity = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // 1. Animate the progress bar immediately on mount (simulating loading)
    progressWidth.value = withTiming(width * 0.65, { duration: 5000, easing: Easing.out(Easing.ease) });

    if (isAppReady) {
      // 2. Once app is ready, fade out the entire splash screen
      opacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(setAnimationComplete)(true);
      });
    }
  }, [isAppReady]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* Main Application */}
      {isAppReady && children}

      {/* Splash Screen Overlay */}
      {!isSplashAnimationComplete && (
        <Animated.View style={[StyleSheet.absoluteFill, styles.container, animatedContainerStyle]} pointerEvents="none">
          
          <ImageBackground
            source={require('../../../assets/images/splash-bg.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
            onLoadEnd={() => SplashScreen.hideAsync()}
          >
            {/* Native Loading Text and Animated Bar */}
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your campus...</Text>
              <View style={styles.progressBarTrack}>
                <Animated.View style={[styles.progressBarFill, animatedProgressStyle]} />
              </View>
            </View>
          </ImageBackground>

        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    zIndex: 999,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: height * 0.08, // Adjust based on exact screen aspect ratio
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  },
  loadingText: {
    color: '#D2B9F8', // Light purple matching the design
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  progressBarTrack: {
    width: width * 0.65,
    height: 4,
    backgroundColor: 'rgba(210, 185, 248, 0.2)', // Faint purple track
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#B682FF', // Vibrant purple matching the UI
    borderRadius: 2,
  }
});
