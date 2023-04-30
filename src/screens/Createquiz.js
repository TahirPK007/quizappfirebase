import {View, Text, TextInput, ToastAndroid, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const Createquiz = ({navigation}) => {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');

  const createquiz = (currentquizid, title, description) => {
    return firestore().collection('quizzes').doc(currentquizid).set({
      title,
      description,
    });
  };

  const savequiz = async () => {
    const currentquizid = Math.floor(100000 + Math.random() * 9000).toString();
    await createquiz(currentquizid, title, description);
    navigation.navigate('Addquestion', {
      currentquizid: currentquizid,
      currentquiztitle: title,
    });

    settitle('');
    setdescription('');
    ToastAndroid.show('quiz saved,', ToastAndroid.SHORT);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>title</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter email"
        value={title}
        onChangeText={txt => settitle(txt)}
      />
      <Text>description</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter email"
        value={description}
        onChangeText={txt => setdescription(txt)}
      />
      <Button title="save quiz" onPress={savequiz} />
    </View>
  );
};

export default Createquiz;
