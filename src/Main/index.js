import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from "../Home/home"
import FilterScreen from "../Home/screens/filter";
import NotifScreen from "../Home/screens/notif";
import ProfilScreen from "../Home/screens/profil";
import CardSetupScreen from "../Home/screens/cardsetup";
import MatchingScreen from "../Home/screens/matching";
import ChatScreen from '../Chat/chat';

const HomeStack = createNativeStackNavigator();

export default function MainScreen() {

  return (
    <NavigationContainer>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>

        <HomeStack.Group>
          <HomeStack.Screen name="Match" component={HomeTabs} />
          <HomeStack.Screen name="Filter" component={FilterScreen} />
          <HomeStack.Screen name="Notif" component={NotifScreen} />
          <HomeStack.Screen name="Profil" component={ProfilScreen} options={{animation: "slide_from_bottom"}}/>
          <HomeStack.Screen name="ChatScreen" component={ChatScreen}/>
        </HomeStack.Group>

        <HomeStack.Group screenOptions={{ presentation: "modal", gestureEnabled: false}}>
          <HomeStack.Screen name="CardSetup" component={CardSetupScreen} />
        </HomeStack.Group>

        <HomeStack.Group screenOptions={{ presentation: "transparentModal", gestureEnabled: false,}}>
          <HomeStack.Screen name="Matching" component={MatchingScreen} />
        </HomeStack.Group>

        
      </HomeStack.Navigator>
    </NavigationContainer>
    
  );
}