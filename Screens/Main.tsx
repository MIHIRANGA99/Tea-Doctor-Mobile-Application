import React, { useState } from "react";
import { View } from "react-native";
import NavContainer from "../Components/BottomNav/NavContainer/NavContainer";
import { NAVIGATION_MENU } from "../constants/navigationMenu";
import NavItem from "../Components/BottomNav/NavItem/NavItem";
import Home from "./Home";
import Settings from "./Settings";
import mainStyles from "../constants/mainStyles";
import Index from "./MyPlants/Index";

const Main = () => {
  const [selectedID, setSelectedID] = useState<number>(
    Math.round(NAVIGATION_MENU.length / 2) - 1
  );

  const componentNavigation = () => {
    switch (selectedID) {
      case 0:
        return <Index />;
      case 1:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
      case 2:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
      case 3:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
      case 4:
        return <Settings />;
      default:
        return <Home changeTab={(n: number) => setSelectedID(n)} />;
    }
  };

  return (
    <>
      <View style={mainStyles.main}>{componentNavigation()}</View>
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
