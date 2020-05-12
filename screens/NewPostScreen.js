import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/UI/HeaderButton';
import NewPost from '../models/newPost';
import {createPost} from '../store/actions/posts'

const NewPostScreen = props => {
  
  const [myName, setMyName] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();


  const submitHandler = async  () => {
     
       setIsLoading(true);
      const post = new NewPost(myName, title, imageUrl,description)
    //   console.log(post)
    await dispatch(createPost(myName, title, imageUrl,description))
    setIsLoading(false);
    props.navigation.goBack();
  };

  props.navigation.setOptions({
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent = {HeaderButton}>
            <Item 
                title = 'Save' 
                iconName = 'ios-save' 
                onPress = {submitHandler}
            />
        </HeaderButtons>
    )})

    if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={'red'} />
          </View>
        );
      }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>My Name</Text>
          <TextInput
            style={styles.input}
            value={myName}
            onChangeText={text => setMyName(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    // fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
    }
});

export default NewPostScreen;