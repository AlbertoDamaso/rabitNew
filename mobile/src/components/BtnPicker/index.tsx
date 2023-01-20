import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  TouchableOpacity as TO,
  Text,
} from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface PickerParms {
    title: string
}
export function BtnPicker({ title, ...rest }: PickerParms) {
  return (
    <TO
     style={styles.click}
     {...rest}
    >
      <Text style={styles.text}>
          {title}
      </Text>

      <Feather name="chevron-down" size={24} color={theme.colors.secundaryMenos} />
    </TO>
  );
}