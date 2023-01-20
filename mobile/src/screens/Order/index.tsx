import { Feather } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import { Background } from '../../components/Background';
import { BtnCount } from '../../components/BtnCount';
import { BtnPicker } from '../../components/BtnPicker';
import { BtnTrash } from '../../components/BtnTrash';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export function Order() {

  const route = useRoute<OrderRouteProps>();
  const [category, setCategory] = useState('');
  const [count, setCount] = useState(1);

  //Contadores
  function minus(){
      if(count > 0){
          setCount(count-1)
      }
  }
  function plus(){
      setCount(count+1)
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaTitle}>
            <Text style={styles.title}>
              Mesa {route.params.number}
            </Text>
            <BtnTrash/>
          </View>  
          
          <BtnPicker
            title={'Pizza'}
          />

          <BtnPicker
            title={'Pizza Calabresa'}
          />

          <View style={styles.areaBtn}>
            <BtnCount 
              minus={minus}
              plus={plus}
              count={count}
            />

            <Button
              // onPress={handledOrder}
              title={"Adicionar Item"}
              activeOpacity={0.7}
            />
          </View>

          <View>
            <Text>
              Comentario: colocar Lista de itens como o Botão para finalizar o pedido. 
            </Text>
          </View>


        </SafeAreaView>
    </Background>
  );
}