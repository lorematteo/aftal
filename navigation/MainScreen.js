import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/home';
import DiscoverScreen from './screens/discover';
import ChatScreen from './screens/chat';
import ProfilScreen from './screens/profil';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSrc;
          if (route.name === "Home"){
            iconSrc = "copy";
          } else if (route.name === "Discover"){
            iconSrc = "compass";
          } else if (route.name === "Chat"){
            iconSrc = "chatbubbles"
          } else if (route.name === "Profil"){
            iconSrc = "person"
          }

          // You can return any component that you like here!
          return (
            <Ionicons name={iconSrc} size={SCREEN_WIDTH*0.07} color={focused ? "#232323" : "#8A8993"}/>
          );
        },
        tabBarActiveTintColor: '#232323',
        tabBarInactiveTintColor: '#8A8993',
        tabBarStyle: {borderTopWidth: 0, elevation: 0},
        headerShown: false,
        tabBarShowLabel: false,
      })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Discover" component={DiscoverScreen}/>
        <Tab.Screen name="Chat" component={ChatScreen}/>
        <Tab.Screen name="Profil" component={ProfilScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
