import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, TouchableOpacity, } from "react-native";

import { width, height, COLORS } from "../../../utils/constants";

export default function NotifScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Ionicons style={{width: width*0.9, left: 0}} name={"arrow-back"} size={25}/>
        </TouchableOpacity>
        
        <Profil/>
        <Settings/>
      </View>
    );
};

function Profil() {
    return (
        <View style={{alignItems: "center"}}>
            <View style={{width: width*0.25, height: width*0.25,}}>
                <Image style={styles.profilPic} source={require("../../../assets/2.jpeg")}/>
                <View style={{
                    backgroundColor: "#EEC8E0",
                    position: "absolute",
                    bottom: -10,
                    right: -10,
                    width: width*0.1,
                    height: width*0.1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#efefef",
                    borderRadius: 95,
                    borderWidth: 4,
                }}>
                    <Ionicons name="camera" size={width*0.05}/>
                </View>
            </View>
            <Text style={{fontSize: 25, fontWeight: "bold", padding: width*0.05}}>Mattéo Lo Re</Text>
        </View>
    );
};

function Settings() {

    const Separator = () => {
        return (
            <View style={{width: width*0.85, height: 1, backgroundColor: COLORS.gray, opacity: 0.3}}/>
        )
    };

    function SettingLine({name, iconname, color, preview}) {

        if(iconname!=null){
            return (
                <TouchableOpacity style={styles.settingItem}>
                    <View style={{backgroundColor: color, padding: width*0.03, borderRadius: 10, marginRight: 10,}}>
                        <Ionicons name={iconname}/>
                    </View>
                    <Text style={{fontWeight: "500"}}>{name}</Text>
                    <View style={{flex: 1}}></View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color: COLORS.gray, paddingRight: 10}}>{preview}</Text>
                        <Ionicons name="chevron-forward-outline" size={25} color={COLORS.gray}/>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.settingItem}>
                    <Text style={{fontWeight: "500"}}>{name}</Text>
                    <View style={{flex: 1}}></View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color: COLORS.gray, paddingRight: 10}}>{preview}</Text>
                        <Ionicons name="chevron-forward-outline" size={25} color={COLORS.gray}/>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View>
            <View style={styles.settingContainer}>
                <SettingLine name={"Email"} preview={"matteo59115@aol.com"}/>
                <Separator/>
                <SettingLine name={"Date of birth"} preview={"28/08/2001"}/>
                <Separator/>
                <SettingLine name={"Gender"} preview={"Male"}/>
            </View>
            <View style={styles.settingContainer}>
                <SettingLine iconname={"person"} name={"Update your profile"} color={"#FCDDF3"}/>
            </View>
            <View style={styles.settingContainer}>
                <SettingLine iconname={"lock-closed"} name={"Change your password"} color={"#CAFBF8"}/>
                <SettingLine iconname={"help"} name={"Help"} color={"#FEF6D2"}/>
            </View>
            
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 30,
    },
    profilPic: {
        width: width*0.25,
        height: width*0.25,
        borderRadius: 95,
    },
    settingContainer: {
        backgroundColor: "white",
        width: width*0.9,
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 5,
    },
    settingItem: {
        flexDirection: "row",
        height: width*0.15,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 15,
    },
});