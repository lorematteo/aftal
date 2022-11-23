import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from "../Home/home"
import FilterScreen from "../Home/screens/filter";
import NotifScreen from "../Home/screens/notif";
import ProfilScreen from "../Home/screens/profil";

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
        </HomeStack.Group>

        <HomeStack.Group>
          
        </HomeStack.Group>

        
      </HomeStack.Navigator>
    </NavigationContainer>
    
  );
}