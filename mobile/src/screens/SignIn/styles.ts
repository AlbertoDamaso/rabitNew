import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaInput:{
    width: '100%',
    marginVertical: 50,
  },
  areaBtn: {
    width:'100%',
    height: 75,
  },
  link: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 16,
    color: theme.colors.light,
    // fontFamily: theme.fonts.text,
  },
});