import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function App() {
  const router = useRouter();

  const { width, height } = Dimensions.get("window");
  const circleWidth = width / 2;

  const move = useRef(new Animated.Value(0)).current;
  const text0pacity = useRef(new Animated.Value(1)).current;
  const animation = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const startAnimation = () => {
    animation.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(text0pacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(text0pacity, {
            delay: 100,
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: 1000,
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    animation.current.start();
  };

  const stopAnimation = () => {
    if (animation.current) {
      animation.current.stop();
    }
  };

  const toggleAnimation = () => {
    if (isRunning) {
      stopAnimation();
    } else {
      startAnimation();
    }
    setIsRunning((prev) => !prev);
  };

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });

  const exhale = text0pacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={[styles.container, { left: width / 4, top: height / 4 }]}>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
          justifyContent: "center",
          opacity: text0pacity,
        }}
      >
        <Text style={styles.text}>Respire</Text>
      </Animated.View>

      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
          justifyContent: "center",
          opacity: exhale,
        }}
      >
        <Text style={styles.text}>Expire</Text>
      </Animated.View>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });

        return (
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: "purple",
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFillObject,
              transform: [
                { rotateZ: rotation },
                { translateX: translate },
                { translateY: translate },
              ],
            }}
          />
        );
      })}

      <Pressable onPress={toggleAnimation} style={styles.button}>
        <Text style={styles.buttonText}>
          {isRunning ? "Pausar" : "Iniciar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    position: "absolute",
    bottom: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#6200ee",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
