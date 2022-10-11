import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/home';
import DiscoverScreen from './screens/discover';
import ChatScreen from './screens/chat';
import ProfilScreen from './screens/profil';

const tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        }}>

        <tab.Screen name="Accueil" component={HomeScreen} options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={focused ? styles.tabBarTextSelected : styles.tabBarText}>Accueil</Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" size={20} style={focused ? styles.tabBarImageSelected : styles.tabBarImage}/>
          ),
          headerShown: false,
        }}/>
        <tab.Screen name="Découvrir" component={DiscoverScreen} options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={focused ? styles.tabBarTextSelected : styles.tabBarText}>Découvrir</Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="compass" size={20} style={focused ? styles.tabBarImageSelected : styles.tabBarImage}/>
          ),
        }}/>
        <tab.Screen name="Chat" component={ChatScreen} options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={focused ? styles.tabBarTextSelected : styles.tabBarText}>Chat</Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="chatbubbles" size={20} style={focused ? styles.tabBarImageSelected : styles.tabBarImage}/>
          ),
        }}/>
        <tab.Screen name="Profil" component={ProfilScreen} options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={focused ? styles.tabBarTextSelected : styles.tabBarText}>Profil</Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="person" size={20} style={focused ? styles.tabBarImageSelected : styles.tabBarImage}/>
          ),
        }}/>
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarText: {
    color: "grey",
    size: 10
  },
  tabBarTextSelected: {
    color: "black",
    size: 10
  },
  tabBarImage: {
    color: "grey",
  },
  tabBarImageSelected: {
    color: "black",
  }
});
