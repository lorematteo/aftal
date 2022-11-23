import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/signin';
import SignUpMail from './screens/signup';

const SignStack = createNativeStackNavigator();

export default function SignScreen() {
  return (
    <NavigationContainer>
      <SignStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>

        <SignStack.Screen name="SignIn" component={SignInScreen}/>
        <SignStack.Screen name="SignUpMail" component={SignUpMail}/>
        
      </SignStack.Navigator>
    </NavigationContainer>
    
  );
}