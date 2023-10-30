import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import Button from "../../Components/Button/Button";
import mainStyles from "../../constants/mainStyles";
import { COLOR_PALETTE } from "../../constants/colors";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import {
  deleteFromCollection,
  getSingleDataFromCollection,
} from "../../firebase/utils/firestore/firestore";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";
import { useLanguageContext } from "../../Context/LanguageContext";

const TreeDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [treeDetails, setTreeDetails] = useState<any>();
  const { language } = useLanguageContext().state;
  const currentUser = useCurrentUser();

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      getSingleDataFromCollection(currentUser.uid, route.params.tree.id)
        .then((res) => {
          setTreeDetails(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLoading(false);
        });
    }
  }, [currentUser, route]);

  const handleDelete = () => {
    if (currentUser) {
      setIsLoading(true);
      deleteFromCollection(
        currentUser.uid,
        route.params.tree.id,
        (res) => {
          setIsLoading(false);
          navigation.pop();
        },
        (error: any) => {
          setIsLoading(false);
          console.error(error);
          if (error.message) {
            Toast.show(error.message, ToastOptions.error);
          }
        }
      );
    }
  };
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
      <View style={{ paddingVertical: 12 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: COLOR_PALETTE.primary,
          }}
        >
          {treeDetails && treeDetails.treeName}
        </Text>
      </View>
      <DetailCard
        header={language === "English" ? "Suggestions" : "යෝජනා"}
        description={
          language === "English"
            ? "Check the tea leaves and scan if you see any odd spots"
            : "තේ දළු පරීක්ෂා කර ඔබට සැක ස්ථාන තිබේ නම් ස්කෑන් කරන්න"
        }
      />
      <View style={{ paddingVertical: 12 }}>
        <DetailCard
          header="තේ කොළ වල තත්වය"
          button={{
            label: `${Object.keys(treeDetails ? treeDetails.conditions.leaves : {})
              .length
              ? "කොළය නැවත ස්කෑන් කරන්න"
              : "කොළය ස්කෑන් කරන්න"
              }`,
            onClick: () =>
              navigation.navigate("Scan", {
                scanType: "blister",
                tree: route.params.tree,
              }),
            icon: require("../../assets/icons/eco.png"),
          }}
        />
        <DetailCard
          header="තේ අතුවල තත්වය"
          button={{
            label: `${Object.keys(
              treeDetails ? treeDetails.conditions.stemAndBranches : {}
            ).length
              ? "අත්ත නැවත ස්කෑන් කරන්න"
              : "අත්ත ස්කෑන් කරන්න"
              }`,
            onClick: () =>
              navigation.navigate("Scan", {
                scanType: "stem",
                tree: route.params.tree,
              }),
            icon: require("../../assets/icons/branch.png"),
          }}
        />
        <DetailCard
          header="කඳ ගුල්ලන්ගෙ තත්වය"
          button={{
            label: `${Object.keys(treeDetails ? treeDetails.conditions.bugs : {}).length
              ? "ශබ්දය නැවත ස්කෑන් කරන්න"
              : "ශබ්දය ස්කෑන් කරන්න"
              }`,
            onClick: () => navigation.navigate("Bugs", { scanType: "insect", treeId: treeDetails.id }),
            icon: require("../../assets/icons/bug_report.png"),
          }}
        />
      </View>
      <View style={{ paddingTop: 32, paddingBottom: 12 }}>
        <Button
          isLoading={isLoading}
          onClick={() => handleDelete()}
          extraStyles={{ backgroundColor: "#AD0000" }}
          label="තේ ගස ඉවත් කරන්න"
        />
      </View>
    </ScrollView>
  );
};

export default TreeDetails;
