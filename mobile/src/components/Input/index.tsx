import React from 'react';

import {
  TextInput
} from 'react-native';

import { styles } from './styles';

export function Input({...rest}){
  return(
    <TextInput
      placeholderTextColor="#CCDE3F"
      style={styles.input}
      {...rest}
    />
  )
}