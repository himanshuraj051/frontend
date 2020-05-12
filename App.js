import React, {useState} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import FeedNavigator from './navigation/FeedNavigator'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import posts from './store/reducers/posts'
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  posts: posts
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'zilla': require('./assets/fonts/ZillaSlab-Regular.ttf'),
    'zilla-bold': require('./assets/fonts/ZillaSlab-SemiBoldItalic.ttf'),
    'zilla-semi-bold': require('./assets/fonts/ZillaSlab-MediumItalic.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded)
  {
    return (
      <AppLoading
        startAsync = {fetchFonts}
        onFinish = {() => setFontLoaded(true)}
      />
  )}

  return (
    <Provider store={store}>
    <FeedNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
