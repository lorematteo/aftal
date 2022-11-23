import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { onGoogleButtonPress } from '../../../utils/firebase';

import { width, COLORS } from '../../../utils/constants';

export function SocialBox(){
    return (
        <View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.gray, opacity: 0.3}}/>
                    <Text style={{color: COLORS.gray, marginHorizontal: 10}}>Sign up with Google or Facebook</Text>
                <View style={{flex: 1, height: 1, backgroundColor: COLORS.gray, opacity: 0.3}}/>
            </View>

            <View style={{flexDirection: "row", paddingVertical: 20}}>
                <TouchableOpacity style={[styles.socialButton, {marginRight: 5}]}>
                    <Image source={require("../../../assets/facebook.png")} style={{width: 25, height: 25, marginRight: 10}}/>
                    <Text style={{color: COLORS.gray}}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, {marginLeft: 5}]} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                    <Image source={require("../../../assets/google.png")} style={{width: 25, height: 25, marginRight: 10}}/>
                    <Text style={{color: COLORS.gray}}>Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    socialButton: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 15,
        padding: width*0.05,
        alignItems: "center",
        justifyContent: "center",
    }
});