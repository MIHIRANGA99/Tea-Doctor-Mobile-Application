import { View, Image } from "react-native";
import DetailCard from "../Components/DetailCard/DetailCard";
import IconCard from "../Components/IconCard/IconCard";
import { APP_COMPONENTS } from "../constants/appComponents";

const Home = ({ changeTab }: {changeTab: (number: number) => void}) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image style={{width: '100%', resizeMode: 'contain'}} source={require("../assets/tea-doctor-logo.png")} />
      </View>
      <DetailCard
        header="About Your Tea State"
        description="Choose a tea tree that you can see some diseases and let us decide the treatments."
      />
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12}}>
        {APP_COMPONENTS.map((comp, index) => (
          <IconCard key={index} onClick={() => changeTab(0)} icon={comp.icon} title={comp.title} />
        ))}
      </View>
    </View>
  );
};

export default Home;
