import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Signin = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const singinin = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Logged in', ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Signin</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter email"
        value={email}
        onChangeText={txt => setemail(txt)}
      />
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter password"
        value={password}
        onChangeText={txt => setpassword(txt)}
      />
      <Button title="submit" onPress={singinin} />
      <Button
        title="goto signup"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default Signin;
