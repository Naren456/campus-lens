import { Dimensions, Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

type HeroProps = {
  typography: React.ReactNode;
  imageSource: any;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function OnboardingHero({ typography, imageSource, imageStyle, containerStyle }: HeroProps) {
  return (
    <>
      <View style={styles.textContainer}>
        {typography}
      </View>

      {/* Center Illustration */}
      <View style={[styles.logoContainer, containerStyle]}>
        <Image
          source={imageSource}
          style={[styles.logo, imageStyle]}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -250, // User's manual shift
  },
  logo: {
    width: width * 0.85,
    height: width * 0.85,
  },
});
