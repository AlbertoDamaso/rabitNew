import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({

  title:{
    color: theme.colors.primary,
    fontSize:22,
    marginBottom: 10,
  },

  text: {
    color: theme.colors.light,
    fontSize: 19,
  },    

  btn: {
    width:100,
    alignItems: 'center'
  },

  btnText: {
    color: theme.colors.secundaryMais,
  },

  popup:{
    borderRadius: 10,
    backgroundColor: theme.colors.dark,
  }
});