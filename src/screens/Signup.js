import {View, Text, TextInput, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const sinuppp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Signup</Text>
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
      <Button title="signup" onPress={sinuppp} />
      <Button
        title="go to signin"
        onPress={() => {
          navigation.navigate('Signin');
        }}
      />
    </View>
  );
};

export default Signup;
