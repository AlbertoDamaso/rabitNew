import React, { useContext } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';

import { styles } from './styles'


export function Dashboard() {
  
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>
        Painel
      </Text>
      <Button
        title='Sair'
        onPress={signOut}
      />
    </View>
  );
}