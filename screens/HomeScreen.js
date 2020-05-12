import React, {useState, useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {View, Text, StyleSheet, Image, Button, ImageBackground, ActivityIndicator,FlatList} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {fetchPosts} from '../store/actions/posts';

const HomeScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const posts = useSelector(state => state.posts.availablePosts);
    const dispatch = useDispatch();

    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
          await dispatch(fetchPosts());
        } catch (err) {
          setError(err.message);
        }
        setIsRefreshing(false);
      }, [dispatch, setIsLoading, setError]);

      useEffect(() => {
        setIsLoading(true);
        loadPosts().then(() => {
            // console.log(posts, 'gvgh')
          setIsLoading(false);
        });
      }, [dispatch, loadPosts]);

      if (error) {
        return (
          <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <Button
              title="Try again"
              onPress={loadPosts}
              color='red'
            />
          </View>
        );
      }

      if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={'red'} />
          </View>
        );
      }

      if (!isLoading && posts.length === 0) {
        return (
          <View style={styles.centered}>
            <Text style = {{fontFamily: 'zilla'}}>No products found. Maybe start adding some!</Text>
          </View>
        );
      }

      return (
        <FlatList
          onRefresh={loadPosts}
          refreshing={isRefreshing}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style={styles.name}>{itemData.item.myName}</Text>
                <Text style = {styles.title}>{itemData.item.title}</Text>
            </View>
            <View style = {styles.imageContainer}> 
            <Image source = {{uri: itemData.item.imageUrl}} style = {styles.image} />
            </View>
            <View style = {styles.likes}>
                <Icon
                    name="ios-heart"
                    color="#ccc"
                    size={35}
                />
                <Text>   likes</Text>
            </View>
            <View style = {styles.footer}>
                <Text style = {{color: 'grey'}}><Text style = {{fontFamily: 'zilla-semi-bold', color: 'black'}}>Description:</Text> {itemData.item.description}</Text>
            </View>
        </View>
          )}
        />)


};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 50,
        backgroundColor: 'white'
    },
    name: {
        fontSize: 19,
        fontFamily: 'zilla-semi-bold'
    },
    title: {
        color: 'grey',
        fontFamily: 'zilla'
    },
    header: {
        width: '100%',
        paddingHorizontal: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    imageContainer: {
        height: 300,
        width: '100%'
    },
    image: {
        width: '100%',
        height: 300
    },
    likes: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: 10
    },
    footer: {
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default HomeScreen;
