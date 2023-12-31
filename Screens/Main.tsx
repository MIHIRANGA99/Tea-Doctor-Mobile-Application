import React, { useEffect, useState } from "react";
import { View } from "react-native";
import NavContainer from "../Components/BottomNav/NavContainer/NavContainer";
import { NAVIGATION_MENU } from "../constants/navigationMenu";
import NavItem from "../Components/BottomNav/NavItem/NavItem";
import Home from "./Home";
import Settings from "./Settings";
import mainStyles from "../constants/mainStyles";
import Index from "./MyPlants/Index";
import { auth } from "../firebase/config";
import Weather from "./Weather/Weather";
import BlisterMap from "./Map/BlisterMap";

const Main = ({navigation}: {navigation: any}) => {
  const [selectedID, setSelectedID] = useState<number>(
    Math.round(NAVIGATION_MENU.length / 2) - 1
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged In");
      } else {
        navigation.navigate('Login');
        console.log("logged out");
      }
    });
  }, [selectedID]);

  const componentNavigation = () => {
    switch (selectedID) {
      case 0:
        return <Index />;
      case 1:
        return <BlisterMap changeTab={(n: number) => setSelectedID(n)} />;
      case 2:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
      case 3:
        return <Weather changeTab={(n: number) => setSelectedID(n)} />;
      case 4:
        return <Settings />;
      default:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
    }
  };

  return (
    <>
      <View style={selectedID === 1? {height: '100%', paddingBottom: 60} : mainStyles.main}>{componentNavigation()}</View>
      <NavContainer>
        {NAVIGATION_MENU.map((item, index) => (
          <NavItem
            key={index}
            onPressed={() => setSelectedID(index)}
            isSelected={index === selectedID}
            icon={item.iconPath}
          />
        ))}
      </NavContainer>
    </>
  );
};

export default Main;
