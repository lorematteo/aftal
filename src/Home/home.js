import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MatchScreen from "./screens/match";
import FilterScreen from "./screens/filter";
import NotifScreen from "./screens/notif";
import ProfilScreen from "./screens/profil";

const HomeStack = createNativeStackNavigator();

export default function HomeScreenStack(){
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Match" component={MatchScreen} />
      <HomeStack.Screen name="Filter" component={FilterScreen} />
      <HomeStack.Screen name="Notif" component={NotifScreen} />
      <HomeStack.Screen name="Profil" component={ProfilScreen} options={{animation: "slide_from_bottom"}}/>
    </HomeStack.Navigator>
  )
}