import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import NewPostScreen from '../screens/NewPostScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

function FeedStackNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
          backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            fontFamily: 'zilla-bold'
          },
          headerTintColor: 'white'
      }}
    >
        <Stack.Screen name="Home" component={HomeScreen} options = {{
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                            <Item title = '' iconName = 'ios-flower' onPress = {() => {() => {}}}/>
                        </HeaderButtons>),
                        title: 'Instafram'
                    }} />
      </Stack.Navigator>
  );
}

const NewStack = createStackNavigator();

function PostStackNavigator() {
    return (
        <NewStack.Navigator
          screenOptions={{
            headerStyle: {
            backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
              fontFamily: 'zilla-bold'
            },
            headerTintColor: 'white'
        }}
      >
          <NewStack.Screen name="NewPost" component={NewPostScreen} options = {{title: 'New Post'}}/>
        </NewStack.Navigator>
    );
  }

const TabNavigator = createMaterialBottomTabNavigator();
    function BottomNavigator() {
    return (
      <NavigationContainer>
        <TabNavigator.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = 'ios-home';
    
                  } else if (route.name === 'New-Post') {
                    iconName = focused ? 'ios-cloud-upload' : 'ios-cloud-outline';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={22} color={color} />;
                },
              })}
                shifting = {true}
                initialRouteName="Home"
                activeColor="black"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: '#694fad'}}
        
            >
          <TabNavigator.Screen name="Home" component={FeedStackNavigator} options = {{tabBarLabel: <Text style = {{fontFamily: 'zilla'}}>Home</Text>,tabBarColor: 'white'}}/>
          <TabNavigator.Screen name="New-Post" component={PostStackNavigator} options = {{tabBarLabel: <Text style = {{fontFamily: 'zilla'}}>New Post</Text>,tabBarColor: 'white'}}/>
        </TabNavigator.Navigator>
      </NavigationContainer>
    );
}



export default BottomNavigator;