// React e hooks usados no componente
import React, { useEffect, useRef, useState } from "react";

// Componentes e APIs nativas do React Native
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

// Ícones do pacote Expo Vector Icons para interface
import { Ionicons } from "@expo/vector-icons";

// Navegação usando o roteador do Expo Router
import { useRouter } from "expo-router";

export default function BreathingGuide() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const circleWidth = width * 0.7;

  const moveAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const pulseAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [phase, setPhase] = useState<"Inspirar" | "Expirar">("Inspirar");
  const [modalVisible, setModalVisible] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  const startAnimation = () => {
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim, {
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
          Animated.timing(moveAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    animationRef.current.start();

    pulseAnimationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimationRef.current.start();
  };

  const stopAnimation = () => {
    animationRef.current?.stop();
    pulseAnimationRef.current?.stop();
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

  const translate = moveAnim.interpolate({
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
      <Text style={styles.title}>Respiração Guiada</Text>

      <Pressable
        onPress={handleBackPress}
        style={styles.backButton}
        hitSlop={10}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.infoButton}
        hitSlop={10}
      >
        <Text style={styles.infoButtonText}>?</Text>
      </Pressable>

      <View
        style={[
          styles.circleWrapper,
          { width: circleWidth, height: circleWidth },
        ]}
      >
        {[...Array(8).keys()].map((item) => {
          const rotation = moveAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });

          return (
            <Animated.View
              key={item}
              style={[
                styles.circleSegment,
                {
                  backgroundColor: moodColor,
                  width: circleWidth,
                  height: circleWidth,
                  borderRadius: circleWidth / 2,
                  opacity: 0.15,
                  transform: [
                    { scale: pulseAnim },
                    { rotateZ: rotation },
                    { translateX: translate },
                    { translateY: translate },
                  ],
                },
              ]}
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

      <Pressable onPress={toggleAnimation} style={styles.button} hitSlop={10}>
        <Text style={styles.buttonText}>
          {isRunning ? "Pausar Respiração" : "Iniciar Respiração"}
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Sobre esta tela</Text>
            <Text style={styles.modalText}>
              Esta tela ajuda você a controlar a respiração, reduzindo a ansiedade
              e promovendo relaxamento. Siga as instruções para inspirar e
              expirar.
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              hitSlop={10}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
    zIndex: 10,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleSegment: {
    position: "absolute",
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
  infoButton: {
    position: "absolute",
    top: 50,
    right: 30,
    backgroundColor: "#6200ee",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  infoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6200ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B4965",
    marginBottom: 20,
    textAlign: "center",
  },
});
