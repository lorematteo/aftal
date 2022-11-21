import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreenStack from '../Home/home';
import DiscoverScreen from '../Discover/discover';
import ChatScreen from '../Chat/chat';
import PremiumScreen from '../Profil/profil';

import { width, height, COLORS} from "../../utils/constants";

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
          } else if (route.name === "Premium"){
            iconSrc = "star"
          }

          // You can return any component that you like here!
          return (
            <Ionicons name={iconSrc} size={width*0.07} color={focused ? "#232323" : "#8A8993"}/>
          );
        },
        tabBarActiveTintColor: '#232323',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {borderTopWidth: 0, elevation: 0},
        headerShown: false,
        tabBarShowLabel: false,
      })}>
        <Tab.Screen name="Home" component={HomeScreenStack}/>
        <Tab.Screen name="Discover" component={DiscoverScreen}/>
        <Tab.Screen name="Chat" component={ChatScreen}/>
        <Tab.Screen name="Premium" component={PremiumScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
