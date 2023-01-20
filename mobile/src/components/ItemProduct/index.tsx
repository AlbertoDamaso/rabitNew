import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback as TWF,
  TouchableOpacity as TO
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { BtnTrash } from '../BtnTrash';

export interface ItemProps {
  data:{
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  },
  deleteItem: (item_id: string) => void;
}

export function ItemProduct({ data, deleteItem }: ItemProps){

  function handleDeleteItem(){
    deleteItem(data.id)
  }

  return (
    <TWF
    onLongPress={handleDeleteItem}
    >
      <View style={styles.container}>
        <Text style={styles.item}>
          {data.amount} - {data.name}
        </Text>

        <TO>
          <BtnTrash
            onPress={handleDeleteItem}
          />
        </TO>
      </View>
    </TWF>    
  );
}