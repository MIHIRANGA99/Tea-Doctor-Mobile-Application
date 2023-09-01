import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import TreeCard from "../../Components/TreeCard/TreeCard";
import mainStyles from "../../constants/mainStyles";
import { getDataFromCollection } from "../../firebase/utils/firestore/firestore";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import ITree from "../../interfaces/ITree";
import FullScreenLoader from "../../layouts/FullScreenLoader";

const MyPlants = ({ navigation }: { navigation: any }) => {
  const [trees, setTrees] = useState<ITree[]>([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      getDataFromCollection(currentUser.uid)
        .then((res: ITree[]) => {
          setTrees(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [currentUser]);

  return (
    <ScrollView style={mainStyles.main}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", resizeMode: "contain" }}
          source={require("../../assets/tea-doctor-logo.png")}
        />
      </View>
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      <FullScreenLoader isLoading={trees.length === 0}>
        {trees && (
          <View
            style={{
              paddingVertical: 12,
              height: trees.length === 0 ? 200 : "100%",
            }}
          >
            {trees.map((tree, index) => (
              <TreeCard
                key={index}
                treeName={tree.treeName}
                style="filled"
                onClick={() =>
                  navigation.navigate("Details", {
                    id: tree.id,
                    name: tree.treeName,
                  })
                }
              />
            ))}
            <TreeCard
              onClick={() => navigation.navigate("AddTree")}
              style="outlined"
              treeName="+ Add New Tree"
            />
          </View>
        )}
      </FullScreenLoader>
    </ScrollView>
  );
};

export default MyPlants;
