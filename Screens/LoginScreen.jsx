import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {


  return (
    <View style={s.container}>
      <Text style={s.text}>Misha. Wie geht's?</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '25',
  }
});

export default LoginScreen;