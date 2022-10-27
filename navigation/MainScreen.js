import { StyleSheet, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/home';
import DiscoverScreen from './screens/discover';
import ChatScreen from './screens/chat';
import ProfilScreen from './screens/profil';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={DiscoverScreen} />
      </Stack.Navigator>
      <MenuBar />
    </NavigationContainer>
  );
}

const MenuBar = (props) => (
  <View style={styles.menuBar}>
    <Ionicons name="copy" size={30} style={styles.tabBarImage}/>
    <Ionicons name="compass" size={30} style={styles.tabBarImage}/>
    <Ionicons name="chatbubbles" size={30} style={styles.tabBarImage}/>
    <Ionicons name="person" size={30} style={styles.tabBarImage}/>
  </View>
);

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
  },
  menuBar: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: SCREEN_WIDTH*0.1,
    marginBottom: SCREEN_HEIGHT*0.05,
    marginTop: SCREEN_HEIGHT*0.03,
  },
});
