import React from 'react'
import { View, Image } from 'react-native';
import DetailCard from '../Components/DetailCard/DetailCard';
import TreeCard from '../Components/TreeCard/TreeCard';

type Props = {}

const MyPlants = (props: Props) => {

  const SAMPLE_TREES = [
    {
      treeName: 'First Tree'
    },
    {
      treeName: 'Second Tree'
    },
    {
      treeName: 'Third Tree'
    }
  ]
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
        </View>
        <DetailCard
          header="Suggestions"
          description="Check the tea leaves and scan if you see any odd spots"
        />
        <View style={{paddingTop: 12}}>
        {SAMPLE_TREES.map((tree, index) => (
          <TreeCard key={index} treeName={tree.treeName} style='filled' />
        ))}
        {Array(4 - SAMPLE_TREES.length).fill(0).map((tree, index) => (
          <TreeCard key={index} style='outlined' treeName='+' />
        ))}
        </View>
    </View>
  )
}

export default MyPlants