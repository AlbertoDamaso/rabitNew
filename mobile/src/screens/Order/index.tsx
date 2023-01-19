import React from 'react';

import {
  SafeAreaView,
  Text
} from 'react-native';
import { Background } from '../../components/Background';

import { styles } from './styles';

export function Order() {
  return (
    <Background>
        <SafeAreaView style={styles.container}>
            <Text>Tela order</Text>
        </SafeAreaView>
    </Background>
  );
}