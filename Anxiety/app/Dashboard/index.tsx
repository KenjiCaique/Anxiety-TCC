import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { styles } from './styles'
import Svg, { Path, Ellipse } from "react-native-svg";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/User')}>
          <Ionicons name="person-circle" size={45} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.caminho}>
        <Svg height="100%" width="100%">
        </Svg>
      </View>

      <View style={styles.botoes}>
        <TouchableOpacity onPress={() => router.push('/Dashboard')}>
          <FontAwesome5 name="map" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Calendario')}>
          <FontAwesome5 name="calendar-alt" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Modo_foco')}>
          <MaterialCommunityIcons name="school-outline" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Respiracao')}>
          <MaterialCommunityIcons name="clock" size={25} color="#7B339C" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}