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
  
  text: {
    color: theme.colors.light,
    fontSize: 19,
    marginBottom: 20,
  },

  areaBtn: {
    width: '80%',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },

  areaList: {
    width: '100%',
    height: '49%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  titleList: {
    marginVertical: 15,
    alignSelf: 'center',
    color: theme.colors.light,
    fontSize: 25,
    fontWeight: 'bold',
  },

  alertContainer: {
    backgroundColor: theme.colors.dark,
  },

  textAlert: {
    color: theme.colors.dark,
  }

});