import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Battle } from '../pages';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="battle" component={Battle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
