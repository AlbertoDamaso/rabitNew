import React from 'react';
import Dashboard from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function AppRoutes(){
  return(
    <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
    </Stack.Navigator>
  )
}

