import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen.jsx';
import MainScreen from './screens/MainScreen.jsx';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Authenticate' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authenticate" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={(route)=>{
        return <MainScreen role={route} />
      }} />
    </Stack.Navigator>
  );
}

export default MyStack;