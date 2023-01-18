import React from 'react';
import { View } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {

  const isAuthenticate = false;
  const loading = false;  
    
  return(
    isAuthenticate? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;