import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  areaTitle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 25,
    flexDirection: 'row',
  },

  title: {
    color: theme.colors.light,
    fontSize: 35,
    fontWeight: 'bold',
    marginRight: 10,
  },
  
  areaBtn: {
    width: '80%',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
  },

});