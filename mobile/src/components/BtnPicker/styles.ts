import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  click: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width:'80%',
    height: 45,
    marginBottom: 20,
    paddingVertical: 10,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: theme.colors.secundary,
    borderRadius: 5,
    backgroundColor: theme.colors.secundary,
    flexDirection: 'row',
    
  },
  
  text: {
    paddingHorizontal: 15,
    fontSize: 19,
    color: theme.colors.secundaryMenos
  }


});