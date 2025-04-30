import React from 'react';
import { Text, View } from "react-native";
import Welcome from './Welcome';
import SignIn from './SignIn';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

export default function Index() {
  return (
    <>
      <StatusBar backgroundColor="#38A69D" />
      <Welcome />
    </>

  )
} 
  
