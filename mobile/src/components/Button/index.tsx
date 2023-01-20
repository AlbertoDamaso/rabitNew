import React, { ReactNode, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';
import { styles } from './styles';

interface ButtonProps {
    title: string,
    onPress: () => void;
    activeOpacity?: number,
    rest?: any, 
}

export function Button({ title, onPress, activeOpacity, ...rest}:ButtonProps) {

  const { loadingAuth } = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={styles.click}
      onPress={onPress}
      activeOpacity={activeOpacity}
      {...rest}
    >
      {
        loadingAuth ? (
          <ActivityIndicator size={30} color="#000" />
        ) : (      
          <Text style={styles.text}>
            { title }
          </Text>
        )
      }
        
        {/* <Text style={styles.text}>
            { title }
        </Text> */}
    </TouchableOpacity>
  );
}