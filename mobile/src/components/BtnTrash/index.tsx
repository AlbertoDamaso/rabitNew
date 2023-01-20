import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  TouchableOpacity as TO,
} from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function BtnTrash({...rest}) {
  return (
    <TO 
     style={styles.btn}
     {...rest}
    >
        <Feather
          name="trash-2"
          size={25}
          color={theme.colors.danger}
        />
    </TO>
  );
}