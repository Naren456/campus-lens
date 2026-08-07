import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { Colors } from '../../constants/Colors';
import OnboardingBottomCard from '../../components/onboarding/OnboardingBottomCard';
import OnboardingHeader from '../../components/onboarding/OnboardingHeader';
import OnboardingHero from '../../components/onboarding/OnboardingHero';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.white,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  stepWrapper: {
    width: width,
    flex: 1,
  },
  topSectionBackground: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 16,
  },
  hugeTextDark: {
    fontSize: 42,
    color: Colors.text.dark,
    fontWeight: '800',
    lineHeight: 48,
  },
  hugeTextPurple: {
    fontSize: 42,
    color: Colors.primary,
    fontWeight: '800',
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.body,
    lineHeight: 24,
    fontWeight: '400',
  },
  subtitleLarge: {
    fontSize: 18,
    color: Colors.text.body,
    lineHeight: 28,
    fontWeight: '400',
    marginTop: 16,
  },
  animatedContainer: {
    flex: 1,
  },
});

const ONBOARDING_STEPS = [
  {
    id: 'step1',
    background: require('../../../assets/onboarding/step1_bg.png'),
    hero: require('../../../assets/onboarding/step1_hero.png'),
    heroStyle: undefined,
    heroContainerStyle: undefined,
    typography: (
      <>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandText}>
          <Text style={{ color: Colors.text.dark }}>Campus</Text>
          <Text style={{ color: Colors.primary }}>Lens</Text>
        </Text>
        <Text style={styles.subtitle}>
          One place for every <Text style={{ color: Colors.primary }}>memory</Text>,{'\n'}
          <Text style={{ color: Colors.primary }}>notice</Text> & <Text style={{ color: Colors.primary }}>deadline</Text>.
        </Text>
      </>
    ),
    bottomText: "All your campus moments,\nbeautifully organized.",
  },
  {
    id: 'step2',
    background: require('../../../assets/onboarding/step2_bg.png'),
    hero: require('../../../assets/onboarding/step2_hero.png'),
    heroStyle: { width: width * 1.15, height: width * 1.45 },
    heroContainerStyle: { marginTop: -50 },
    typography: (
      <>
        <Text style={styles.hugeTextDark}>Never miss</Text>
        <Text style={styles.hugeTextPurple}>what matters</Text>
        
        <Text style={styles.subtitleLarge}>
          Deadlines, exams, events, and{'\n'}
          notices — all in <Text style={{ color: Colors.primary }}>one place</Text>.
        </Text>
      </>
    ),
    bottomText: "Stay updated. Stay ahead.\nAlways on time.",
  },
  {
    id: 'step3',
    background: require('../../../assets/onboarding/step1_bg.png'),
    hero: require('../../../assets/onboarding/step1_hero.png'),
    heroStyle: undefined,
    heroContainerStyle: undefined,
    typography: (
      <>
        <Text style={styles.hugeTextDark}>Get connected.</Text>
        <Text style={styles.hugeTextPurple}>Get involved.</Text>
        
        <Text style={styles.subtitleLarge}>
          Connect with peers, join clubs, and{'\n'}
          make the most out of <Text style={{ color: Colors.primary }}>campus life</Text>.
        </Text>
      </>
    ),
    bottomText: "Start your campus journey\nwith us today!",
  }
];

const TOTAL_STEPS = ONBOARDING_STEPS.length;

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(-currentStep * width, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentStep]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: width * TOTAL_STEPS,
  }));

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Onboarding complete!');
      router.replace('/welcome');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    console.log('Skip pressed');
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Slider View containing all steps horizontally */}
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View style={[styles.sliderContainer, animatedStyle]}>
          {ONBOARDING_STEPS.map((stepData, index) => (
            <View key={stepData.id} style={styles.stepWrapper}>
              <ImageBackground
                source={stepData.background}
                style={styles.topSectionBackground}
                resizeMode="cover"
              >
                <View style={styles.content}>
                  {/* Keep header in each slide so it aligns correctly with the content padding */}
                  <OnboardingHeader 
                    onSkipPress={handleSkip} 
                    onBackPress={handleBack}
                    showBack={index > 0} 
                  />
                  
                  <View style={styles.animatedContainer}>
                    <OnboardingHero
                      imageSource={stepData.hero}
                      imageStyle={stepData.heroStyle}
                      containerStyle={stepData.heroContainerStyle}
                      typography={stepData.typography}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </Animated.View>
      </View>

      <OnboardingBottomCard 
        text={ONBOARDING_STEPS[currentStep].bottomText}
        activeDotIndex={currentStep}
        onNextPress={handleNext}
      />
    </SafeAreaView>
  );
}
