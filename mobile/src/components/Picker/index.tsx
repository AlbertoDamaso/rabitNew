import { PickerIOS } from '@react-native-picker/picker';
import React from 'react';

import {
  View
} from 'react-native';

import { styles } from './styles';

interface PickerParms{
    onChange?: any; 
    data?: any;
    rest?: any;
}

export function Picker({ onChange, data, ...rest}: PickerParms) {
  return (
    <PickerIOS
     style={styles.picker}
     selectedValue={data}
     onValueChange={ (valor) => onChange(valor)}
    >
        <PickerIOS.Item label='Selecione a categoria' value=''/>
        <PickerIOS.Item label='Pizza' value='pizza'/>
        <PickerIOS.Item label='Pizza de Calabresa' value='pizzaC'/>

    </PickerIOS>
  );
}