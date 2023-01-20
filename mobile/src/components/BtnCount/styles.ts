import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
btnCount: {
    width: 90,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 22,
    borderRadius: 45,
    flexDirection: 'row',
    backgroundColor: theme.colors.secundaryMais,
},
count: {
    marginHorizontal: 10,
    // fontFamily: theme.fonts.text,
    fontSize: 19,
    color: theme.colors.light,
},
minus: {

},
plus: {

},
  
});