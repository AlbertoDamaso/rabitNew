import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Keyboard,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';

import { styles } from './styles';
import { Background } from '../../components/Background';

export function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);

  function handleLogin(){
    if(email === '' || password === ''){
      return;
    }
    // signIn(email, password);
    console.log('Email digitado' + email)
  }

  function handleSignUp(){
    // navigation.navigate('SignUp');
  }

  return (
    <Background>
      <View style = {styles.container}>
        <Image
          source={require('../../assets/icon.png')}
          resizeMode="stretch"
        />      
        <View style={styles.areaInput}>

          <Input
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={ () => Keyboard.dismiss()}
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={ setEmail }
          />
          <Input
            placeholder="Senha"
            returnKeyType="next"
            isSecure={true}
            onSubmitEditing={ () => Keyboard.dismiss()}
            autoCapitalize="none"
            value={password}
            onChangeText={ setPassword }
            secureTextEntry={true}
          />
        </View>

        <View style={styles.areaBtn}>
          <Button
            onPress={handleLogin}
            title={"Entrar"}
            //activeOpacity={0.7}
          />
        </View>
      </View>
    </Background>
  );
}