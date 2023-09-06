import { View, Image, Text, ToastAndroid } from "react-native";
import DetailCard from "../Components/DetailCard/DetailCard";
import IconCard from "../Components/IconCard/IconCard";
import { APP_COMPONENTS } from "../constants/appComponents";
import { COLOR_PALETTE } from "../constants/colors";
import useCurrentUser from "../firebase/hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button/Button";
import { useEffect, useState } from "react";
import { getDataFromCollection } from "../firebase/utils/firestore/firestore";
import ITree from "../interfaces/ITree";
import { calculateConditions } from "../utils/calculateHealth";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../constants/ToastOptions";

const Home = ({ changeTab }: { changeTab: (number: number) => void }) => {
  const [stateHealth, setStateHealth] = useState<number>(0);
  const user = useCurrentUser();

  const navigation: any = useNavigation();

  useEffect(() => {
    if (user) {
      getDataFromCollection(user.uid).then((res: ITree[]) => {
        let totalHealth = 0;
        res.forEach((tree: ITree) => {
          const value = calculateConditions(tree.id? tree.id: '', res);
          totalHealth = totalHealth + value;
        });

        totalHealth = totalHealth / res.length;
        setStateHealth(totalHealth);
      }).catch((e) => {
        console.error(e);
      })
    }
  }, [changeTab, user]);

  const navigateToDiseaseDetails = () => {
    navigation.navigate("DiseaseDisplay");
  };

  const navigateToDiseaseCategory = () => {
    navigation.navigate("Category");
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", resizeMode: "contain" }}
          source={require("../assets/tea-doctor-logo.png")}
        />
        <Text style={{ color: COLOR_PALETTE.primary, fontWeight: "700" }}>
          {user ? `Hi ${user.displayName || user.email}!` : "Loading..."}
        </Text>
      </View>
      <DetailCard
        header="About Your Tea State"
        description={`ඔබගේ සමස්ත තේ වගාවේ ප්‍රගතිය ${stateHealth? stateHealth: 0}%`}
      />
      <DetailCard
        header="Suggestions"
        description="Choose a tea tree that you can see some diseases and let us decide the treatments."
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 12,
        }}
      >
        {APP_COMPONENTS.map((comp, index) => (
          <IconCard
            key={index}
            onClick={() => changeTab(comp.title === "Weather Condition" ? 3 : 0)}
            icon={comp.icon}
            title={comp.title}
          />
        ))}
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Button
          label="රෝග ගැන ඉගෙන ගන්න"
          onClick={navigateToDiseaseDetails}
          color={COLOR_PALETTE.primary}
          extraStyles={{height: 72, borderRadius: 12, marginVertical: 4}}
        />
        <Button
          label="ඔබගේ අතීත රෝග හඳුනාගැනීම් බලන්න"
          onClick={navigateToDiseaseCategory}
          color={COLOR_PALETTE.primary}
          extraStyles={{height: 72, borderRadius: 12, marginVertical: 4}}
        />
      </View>
    </View>
  );
};

export default Home;
