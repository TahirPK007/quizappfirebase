import {View, Text, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = ({navigation}) => {
  const [allquizzes, setallquizzes] = useState([]);
  const [refershing, setrefershing] = useState(false);

  console.log(allquizzes);
  const getquizzes = () => {
    return firestore().collection('quizzes').get();
  };

  const getallquizes = async () => {
    setrefershing(true);
    const quizes = await getquizzes();
    let tempquizzes = [];
    await quizes.docs.forEach(async quiz => {
      await tempquizzes.push({id: quiz.id, ...quiz.data()});
    });
    await setallquizzes([...tempquizzes]);
    setrefershing(false);
  };
  useEffect(() => {
    getallquizes();
  }, []);
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>
      <Text
        onPress={() => {
          logout();
        }}>
        Logout
      </Text>
      <Button
        title="crate quiz"
        onPress={() => {
          navigation.navigate('Createquiz');
        }}
      />
      <View>
        <FlatList
          data={allquizzes}
          onRefresh={getallquizes}
          refreshing={refershing}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            <View style={{backgroundColor: 'red', height: 200, width: 200}}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>;
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
