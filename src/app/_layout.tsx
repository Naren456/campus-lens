import { Asset } from 'expo-asset';
import '../global.css';
import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AnimatedSplashScreen from '../components/common/AnimatedSplashScreen';

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // Preload onboarding images for instant rendering
        const imageAssets = [
          require('../../assets/onboarding/step1_bg.png'),
          require('../../assets/onboarding/step1_hero.png'),
          require('../../assets/onboarding/step2_bg.png'),
          require('../../assets/onboarding/step2_hero.png'),
        ];
        
        await Promise.all([
          ...imageAssets.map(image => Asset.fromModule(image).downloadAsync()),
          new Promise(resolve => setTimeout(resolve, 2000)) // Keep a small simulated delay for the animation
        ]);
      } catch (e) {
        console.warn('Error preloading resources:', e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <AnimatedSplashScreen isAppReady={isAppReady}>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      </AnimatedSplashScreen>
    </>
  );
}
