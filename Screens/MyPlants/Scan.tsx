import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import mainStyles from '../../constants/mainStyles'
import ScanCam from '../../Components/ScanCam/ScanCam'
import DetailCard from '../../Components/DetailCard/DetailCard'
import { COLOR_PALETTE } from '../../constants/colors'
import Button from '../../Components/Button/Button'

type Props = {}

const Scan = (props: Props) => {
    return (
        <ScrollView style={mainStyles.main}>
            <View style={{ paddingVertical: 12 }}>
                <DetailCard header='Suggestions' description='sample suggestion' />
            </View>
            <View style={{ height: 412 }}>
                <ScanCam />
            </View>
            <Text style={{ textAlign: 'center', fontWeight: '700', color: COLOR_PALETTE.primary, paddingVertical: 12 }}>OR</Text>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Button label='Select an Image' extraStyles={{ width: '40%' }} />
            </View>
            <View style={{ paddingVertical: 12 }}>
                <DetailCard header='Normal' description='Sample Description' button={{ label: 'Next', onClick: () => null }} />
            </View>
        </ScrollView>
    )
}

export default Scan