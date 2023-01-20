import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
import { api } from '../../services/api';
import { styles } from './styles';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}

type CategoryProps = {
  id: string;
  name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export function Order() {

  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState<CategoryProps [] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();

  useEffect(() => {
    async function loadInfo() {
      const respose = await api.get('category')

      setCategory(respose.data);
      setCategorySelected(respose.data[0])
    }

    loadInfo();
  }, [])

  async function handleCloseOrder() {
    try{
      await api.delete('/order', {
        params:{
          order_id: route.params?.order_id
        }
      })

      navigation.goBack();

    }catch(err){
      console.log(err)
    }
  }

  //Contadores
  async function minus(){
    if(count > 0){
      setCount(count-1)
    }
  }
  async function plus(){
    setCount(count+1)
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaTitle}>
            <Text style={styles.title}>
              Mesa {route.params.number}
            </Text>
            <BtnTrash
              onPress={handleCloseOrder}
            />
          </View>  
          
          {
            category.length !== 0 
          ?
            <BtnPicker
              title={categorySelected?.name}
            />
          :
            <Text style={styles.text}>
              Nenhuma categoria cadastrada...
            </Text>
          }

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