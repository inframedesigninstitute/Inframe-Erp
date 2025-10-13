import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed = 80,
  style,
  textStyle,
  containerStyle,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const textWidth = text.length * 9; 
  const containerWidth = screenWidth - 32; 

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(containerWidth);

      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: ((containerWidth + textWidth) / speed) * 1000,
        useNativeDriver: true,
      }).start(() => {
        startAnimation();
      });
    };

    startAnimation();
  }, [text, speed, textWidth, containerWidth]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.marqueeContainer, style]}>
        <Animated.Text
          style={[
            styles.marqueeText,
            textStyle,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {text}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  marqueeContainer: {
    height: 20,
    justifyContent: 'center',
  },
  marqueeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000ff',
  },
});

export default MarqueeText;
