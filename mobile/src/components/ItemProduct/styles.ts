import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    backgroundColor: theme.colors.secundaryMais,
  },

  item: {
    fontWeight: 'bold',
    fontSize: 19,
    color: theme.colors.light,
  }
});