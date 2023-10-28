import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import TreeCard from "../../Components/TreeCard/TreeCard";
import mainStyles from "../../constants/mainStyles";
import { getDataFromCollection } from "../../firebase/utils/firestore/firestore";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import ITree from "../../interfaces/ITree";
import FullScreenLoader from "../../layouts/FullScreenLoader";
import { COLOR_PALETTE } from "../../constants/colors";
import { calculateConditions } from "../../utils/calculateHealth";

const MyPlants = ({ navigation }: { navigation: any; route: any }) => {
  const [trees, setTrees] = useState<ITree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      getDataFromCollection(currentUser.uid)
        .then((res: ITree[]) => {
          setTrees(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLoading(false);
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
      <Text
        style={{
          color: COLOR_PALETTE.primary,
          fontWeight: "600",
          textAlign: "center",
          paddingVertical: 12,
        }}
      >
        My Trees
      </Text>
      <FullScreenLoader isLoading={isLoading}>
        {trees && (
          <View
            style={{
              paddingBottom: 12,
              height: trees.length === 0 ? 200 : "100%",
            }}
          >
            {trees.map((tree, index) => (
              <TreeCard
                key={index}
                treeName={tree.treeName}
                condition={calculateConditions(tree.id ? tree.id : "", trees)}
                style="filled"
                expandedView={
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "90%",
                      paddingVertical: 12,
                    }}
                  >
                    <View>
                      <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2 }}>
                        Blister Blight
                      </Text>
                      <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2 }}>
                        Stem and Branch Canker
                      </Text>
                      <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2 }}>
                        Bugs
                      </Text>
                    </View>
                    <View>
                      {Object.keys(tree.conditions.leaves).length !== 0 ? (
                        <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2, fontWeight: '600' }}>
                          {tree.conditions.leaves.damageRatio}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: COLOR_PALETTE.error.secondary,
                            backgroundColor: COLOR_PALETTE.error.primary,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            marginVertical: 2, fontWeight: '600'
                          }}
                        >
                          Not Scanned
                        </Text>
                      )}
                      {Object.keys(tree.conditions.stemAndBranches).length !==
                      0 ? (
                        <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2, fontWeight: '600' }}>
                          {tree.conditions.stemAndBranches.damageRatio}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: COLOR_PALETTE.error.secondary,
                            backgroundColor: COLOR_PALETTE.error.primary,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            marginVertical: 2, fontWeight: '600'
                          }}
                        >
                          Not Scanned
                        </Text>
                      )}
                      {Object.keys(tree.conditions.bugs).length !== 0 ? (
                        <Text style={{ color: COLOR_PALETTE.secondary, marginVertical: 2, fontWeight: '600' }}>
                          {tree.conditions.bugs.damageRatio}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: COLOR_PALETTE.error.secondary,
                            backgroundColor: COLOR_PALETTE.error.primary,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            marginVertical: 2, fontWeight: '600'
                          }}
                        >
                          Not Scanned
                        </Text>
                      )}
                    </View>
                  </View>
                }
                onClick={() =>
                  navigation.navigate("Details", {
                    id: tree.id,
                    tree: tree,
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
