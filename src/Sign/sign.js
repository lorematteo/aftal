import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/signin';
import SignUpMail from './screens/signup';

const SignStack = createNativeStackNavigator();

export default function SignScreen({setDisconnected}) {
  return (
    <NavigationContainer>
      <SignStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>

        <SignStack.Screen name="SignIn" component={SignInScreen} initialParams={{setDisconnected: setDisconnected}}/>
        <SignStack.Screen name="SignUpMail" component={SignUpMail} initialParams={{setDisconnected: setDisconnected}}/>
        
      </SignStack.Navigator>
    </NavigationContainer>
    
  );
}