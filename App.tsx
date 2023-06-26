import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Components from "./Screens/Components";
import Main from "./Screens/Main";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Components" component={Components} />
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
