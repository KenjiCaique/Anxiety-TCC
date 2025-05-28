import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

export default function App() {
  const router = useRouter();

  const { width } = Dimensions.get("window");
  const circleWidth = width * 0.7;

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [phase, setPhase] = useState<"Inspirar" | "Expirar">("Inspirar");

  const startAnimation = () => {
    animation.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    animation.current.start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    animation.current?.stop();
  };

  const toggleAnimation = () => {
    if (isRunning) {
      stopAnimation();
    } else {
      startAnimation();
    }
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (!isRunning) {
      setCountdown(4);
      setPhase("Inspirar");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          Vibration.vibrate(100);
          setPhase((prevPhase) =>
            prevPhase === "Inspirar" ? "Expirar" : "Inspirar"
          );
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const exhaleOpacity = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });

  const moodColor = phase === "Inspirar" ? "#6FC3DF" : "#9AD3BC";

  return (

    <View       
      style={[
        styles.container,
        { backgroundColor: phase === "Inspirar" ? "#D0E6F1" : "#D8ECDD" },
      ]}
    >
      <View style={[styles.circleWrapper, { width: circleWidth, height: circleWidth }]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
          const rotation = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });

          return (
            <Animated.View
              key={item}
              style={{
                position: "absolute",
                opacity: 0.15,
                backgroundColor: moodColor,
                width: circleWidth,
                height: circleWidth,
                borderRadius: circleWidth / 2,
                transform: [
                  { scale: pulse },
                  { rotateZ: rotation },
                  { translateX: translate },
                  { translateY: translate },
                ],
              }}
            />
          );
        })}

        <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
          <Text style={[styles.text, { color: "#1B4965" }]}>
            {phase === "Inspirar" ? "Respire" : ""}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.textWrapper, { opacity: exhaleOpacity }]}>
          <Text style={[styles.text, { color: "#40798C" }]}>
            {phase === "Expirar" ? "Expire" : ""}
          </Text>
        </Animated.View>

        <View style={styles.countdownWrapper}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
      </View>

      <Text style={styles.motivationalText}>Mantenha o foco e relaxe</Text>

      <Pressable onPress={toggleAnimation} style={styles.button}>
        <Text style={styles.buttonText}>{isRunning ? "Pausar" : "Iniciar"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
  },
  countdownWrapper: {
    position: "absolute",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#333",
  },
  motivationalText: {
    marginTop: 30,
    fontSize: 18,
    color: "#555",
    fontStyle: "italic",
  },
  button: {
    marginTop: 40,
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
