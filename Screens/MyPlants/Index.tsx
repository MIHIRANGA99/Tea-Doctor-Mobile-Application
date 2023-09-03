import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyPlants from "./MyPlants";
import TreeDetails from "./TreeDetails";
import Scan from "./Scan";
import Bugs from "./Bugs";
import AddTree from "./AddTree";
import Treatments from "../Treatments/Treatments";

function Index() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="MyPlants"
          component={MyPlants}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTree"
          component={AddTree}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="Details"
          component={TreeDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bugs"
          component={Bugs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Treatments"
          component={Treatments}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;
