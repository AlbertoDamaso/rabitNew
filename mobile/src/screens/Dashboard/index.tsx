import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { StackPramsList } from '../../routes/app.routes';
import { api } from '../../services/api';

import { styles } from './styles'

export function Dashboard() {
  
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList, 'Order' >>();
  const [table, setTable] = useState<string | number>('')

  async function openTable(){
    if(table === '' || table === null){
      return
    }

    const respose = await api.post('/order', {
      table: Number(table)
    })

    // console.log(respose.data)

    navigation.navigate('Order', {number: table, order_id: respose.data.id})

    setTable('');
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Novo Pedido
        </Text>

        <Input
          placeholder='Número da mesa'
          returnKeyType='next'
          onSubmitEditing={ () => Keyboard.dismiss()}
          keyboardType='numeric'
          autoCapitalize='none'
          value={table}
          onChangeText={setTable}
        />

        <Button
          title='Abrir mesa'
          onPress={openTable}
        />
      </SafeAreaView>
    </Background>
  );
}