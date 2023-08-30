import { View, Image, Text } from "react-native";
import { EXPO_PUBLIC_API_KEY } from '@env';
import DetailCard from "../Components/DetailCard/DetailCard";
import IconCard from "../Components/IconCard/IconCard";
import { APP_COMPONENTS } from "../constants/appComponents";
import Button from "../Components/Button/Button";
import { COLOR_PALETTE } from "../constants/colors";
import useCurrentUser from "../firebase/hooks/useCurrentUser";

const Home = ({ changeTab }: {changeTab: (number: number) => void}) => {

  const user = useCurrentUser();

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image style={{width: '100%', resizeMode: 'contain'}} source={require("../assets/tea-doctor-logo.png")} />
        <Text style = {{color: COLOR_PALETTE.primary, fontWeight: '700'}}>{user? `Hi ${user.email}!`: 'Loading...'}</Text>
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
