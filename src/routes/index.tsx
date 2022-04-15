import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Battle } from '../pages';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={gestureHandlerRootHOC(Home)} />
        <Stack.Screen name="battle" component={gestureHandlerRootHOC(Battle)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
