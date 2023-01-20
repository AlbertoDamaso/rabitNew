import { PickerIOS } from '@react-native-picker/picker';
import React from 'react';

import {
  View
} from 'react-native';
import { onChange } from 'react-native-reanimated';
import { CategoryProps } from '../../screens/Order';

import { styles } from './styles';

interface PickerProps{
  selectedItem: (item: CategoryProps) => void;
}

export function Picker({ selectedItem, ...rest}: PickerProps) {
  
  function onChangeItem(item: CategoryProps){
    selectedItem.length;
  }

  return (
    <PickerIOS
     style={styles.picker}
     selectedValue={selectedItem?.name}
     onValueChange={() => onChangeItem}
    >
    </PickerIOS>
  );
}