import { StyleSheet } from 'react-native';
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
      <tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if ( route.name == "Accueil"){
              iconName = focused ? "home" : "home-outline"
            } else if ( route.name == "Découvrir" ){
              iconName = focused ? "compass" : "compass-outline"
            } else if ( route.name == "Chat" ){
              iconName = focused ? "chatbubbles" : "chatbubbles-outline"
            } else if ( route.name == "Profil" ){
              iconName = focused ? "person" : "person-outline"
            }

            return <Ionicons name={iconName} size={15} color={"black"}/>
          }
        })}
      >
        <tab.Screen name="Accueil" component={HomeScreen}/>
        <tab.Screen name="Découvrir" component={DiscoverScreen} />
        <tab.Screen name="Chat" component={ChatScreen} />
        <tab.Screen name="Profil" component={ProfilScreen} />
      </tab.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
