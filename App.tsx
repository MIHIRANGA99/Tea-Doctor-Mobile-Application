import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./Screens/Main";
import Register from "./Screens/Auth/Register";
import Login from "./Screens/Auth/Login";
import Details from "./Screens/MyPlants/TreeDetails"
import Insect from "./Screens/Insect/Insect";
import DiseaseDisplay from "./Screens/Search/DiseaseDisplay";
import DiseaseDetailsScreen from "./Screens/Search/DiseaseDetailsScreen";
import HistoryDetails from "./Screens/History/HistoryDetails";
import Category from "./Screens/History/Category";
import BlisterMap from "./Screens/Map/BlisterMap";
import StemMap from "./Screens/Map/StemMap";
import BorerMap from "./Screens/Map/BorerMap";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
          <Stack.Screen name="Details" component={Details} options={{headerShown: false}} />
          <Stack.Screen name="Insect" component={Insect} options={{headerShown: false}} />
          <Stack.Screen name="DiseaseDisplay" component={DiseaseDisplay} options={{headerShown: false}}/>
          <Stack.Screen name="DiseaseDetails" component={DiseaseDetailsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Category" component={Category} options={{ headerShown: false }}/>
          <Stack.Screen name="HistoryDetails" component={HistoryDetails} options={{ headerShown: false }}/>
          <Stack.Screen name="BlisterMap" component={BlisterMap} options={{ headerShown: false }}/>
          <Stack.Screen name="StemMap" component={StemMap} options={{ headerShown: false }}/>
          <Stack.Screen name="BorerMap" component={BorerMap} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


