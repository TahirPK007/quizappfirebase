import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Addquestion = ({navigation, route}) => {
  const [currentquizid, setcurrentquizid] = useState(
    route.params.currentquizid,
  );
  const [currentquiztitle, setcurrentquiztitle] = useState(
    route.params.currentquiztitle,
  );
  const [question, setquestion] = useState('');
  const [correctans, setcorrectans] = useState('');
  const [option2, setoption2] = useState('');
  const [option3, setoption3] = useState('');

  const createquestion = (currentquizid, currentqustnid, question) => {
    return firestore()
      .collection('quizzes')
      .doc(currentquizid)
      .collection('qna')
      .doc(currentqustnid)
      .set(question);
  };

  const savequstn = async () => {
    if (question == '' || correctans == '' || option2 == '' || option3 == '') {
      return;
    }
    let currentqustnid = Math.floor(100000 + Math.random() * 9000).toString();
    await createquestion(currentquizid, currentqustnid, {
      question: question,
      correctans: correctans,
      incorrect_ans: [option2, option3],
    });
    ToastAndroid.show('questn saved', ToastAndroid.SHORT);
    setquestion('');
    setcorrectans('');
    setoption2('');
    setoption3('');
  };
  return (
    <View style={{flex: 1}}>
      <Text>Addquestion</Text>
      <Text>question</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter qustn"
        value={question}
        onChangeText={txt => setquestion(txt)}
      />
      <Text>correct ans</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter corect ans"
        value={correctans}
        onChangeText={txt => setcorrectans(txt)}
      />
      <Text>optn 2</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter optn2"
        value={option2}
        onChangeText={txt => setoption2(txt)}
      />
      <Text>optn 3</Text>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="enter optn3"
        value={option3}
        onChangeText={txt => setoption3(txt)}
      />
      <Button title="save qustn" onPress={savequstn} />
      <Button
        title="done go home"
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
    </View>
  );
};

export default Addquestion;
