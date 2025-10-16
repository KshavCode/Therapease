import { createStackNavigator } from '@react-navigation/stack';
import ExerciseScreen from './screens/ExerciseScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import MainScreen from './screens/MainScreen.jsx';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Authenticate' screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Authenticate" component={LoginScreen} />
      <Stack.Screen name="MainApp">
        {({ route }) => <MainScreen role={route.params.role} />}
      </Stack.Screen>
      <Stack.Screen name="Exercise">
        {({ route }) => <ExerciseScreen name={route.params.name} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default MyStack;