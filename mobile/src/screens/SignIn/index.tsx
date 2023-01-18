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
// import { AuthContext } from '../../contexts/auth';

import { styles } from './styles';
import { Background } from '../../components/Background';

export function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { signIn } = useContext(AuthContext);

  function handleLogin(){
    // signIn(email, password);
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
            // onChangeText={ (text) => setEmail(text) }
          />
          <Input
            placeholder="Senha"
            returnKeyType="next"
            isSecure={true}
            onSubmitEditing={ () => Keyboard.dismiss()}
            autoCapitalize="none"
            value={password}
            // onChangeText={ (text) => setPassword(text) }
            secureTextEntry={true}
          />
        </View>

        <View style={styles.areaBtn}>
          <Button
            // onPress={(handleLogin)}
            title={"Entrar"}
            //activeOpacity={0.7}
          />
        </View>
      </View>
    </Background>
  );
}