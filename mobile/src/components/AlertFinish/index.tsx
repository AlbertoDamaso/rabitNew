import React from 'react';
import {
  View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { styles } from './styles';

interface AlertProps{
    showAlert: boolean;
    title: string;
    text: string;
    onCancelPressed: () => void;
}

export function AlertFinish({ showAlert, title, text, onCancelPressed }: AlertProps) {
  return (
    <AwesomeAlert
        show={showAlert}
        title={title}
        titleStyle={styles.title}
        message={text}
        messageStyle={styles.text}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Não"
        confirmText="Sim"
        cancelButtonStyle={styles.btn}
        confirmButtonStyle={styles.btn}
        cancelButtonColor="#FF0D0D"
        confirmButtonColor="#00FF29"
        cancelButtonTextStyle={styles.btnText}
        confirmButtonTextStyle={styles.btnText}
        contentContainerStyle={styles.popup}
        onCancelPressed={onCancelPressed}
    />
  );
}