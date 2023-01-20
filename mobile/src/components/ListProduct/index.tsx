import React from 'react';
import {
  FlatList
} from 'react-native';
import { ItemProduct } from '../ItemProduct';

import { styles } from './styles';

type FlatListProps = {
  data: any[] | null | undefined;
  deleteItem: (item_id: string) => void;
}

export function ListProduct({ data, deleteItem, ...rest }: FlatListProps) {
  return (
    <FlatList
      data={data}
      style={styles.matches}
      showsVerticalScrollIndicator={false}
      keyExtractor={ item => item.id}
      renderItem={({ item }) => (
        <ItemProduct data={item} deleteItem={deleteItem}/> 
      )}
      {...rest}
    />  
  );
}