import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    width: '80%',
    height: '50%',
    backgroundColor: theme.colors.primaryMenos,
    borderWidth: 1,
    borderColor: theme.colors.secundary,
    borderRadius: 20,
  },

  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.secundary75,
  },

  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.secundaryMenos,
  }
});