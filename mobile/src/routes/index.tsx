import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { AuthContext } from '../contexts/AuthContext';

export function Routes(){
  
  const { isAuthenticated, loading } = useContext(AuthContext);

  if(loading){
    return(
      <View
        style={{
          flex:1,
          backgroundColor: '#006442',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <ActivityIndicator size={60} color={'#f1f1f1'}/>
        </View>
    )
  }
  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}
