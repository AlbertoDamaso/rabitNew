import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';

const Stack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return(
    <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default AuthRoutes;