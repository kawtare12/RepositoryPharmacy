import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import header from "./home";
import HomeScreen from './screens/HomeScreen';
import Main from './screens/MainScreen';
import Map from './screens/Map';
import MapScreen from './screens/MapScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={header}
          options={{ headerShown: false }}
        />
      <Stack.Screen name="Home1" component={HomeScreen} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Home3" component={Map} />
      <Stack.Screen name="MapScreen" component={MapScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




// import React from 'react';
// import Main from './Main';

// const App = () => {
//   return <Main />;
// };

// export default App;

