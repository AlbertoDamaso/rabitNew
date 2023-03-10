import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: theme.colors.light,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});