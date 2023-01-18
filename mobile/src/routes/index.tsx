import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes(){
  
  const isAuthenticate = false;
  const loading = false;  

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
    isAuthenticate? <AppRoutes/> : <AuthRoutes/>
  )
}
