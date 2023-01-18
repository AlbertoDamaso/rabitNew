import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';

const GeneralStatusBar: React.FC = ({ backgroundColor, ...props }: any) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

export default GeneralStatusBar;