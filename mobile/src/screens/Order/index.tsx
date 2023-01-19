import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import { Background } from '../../components/Background';
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

  return (
    <Background>
        <SafeAreaView style={styles.container}>
            <Text>
              {route.params.number}
            </Text>
        </SafeAreaView>
    </Background>
  );
}