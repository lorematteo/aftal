import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, width, height } from "../../../utils/constants";


export default function MatchingScreen({ navigation }) {

    const route = useRoute();
    const { loggedInProfile, userSwiped } = route.params;

    const ProfileView = ({user}) => {
        return (
            <View style={styles.profilContainer}>
                <View style={styles.profilPicContainer}>
                    <Image style={styles.profilPic} source={{uri: user.profilpic}}/>
                </View>
                <Text style={{color: "white", fontWeight: "700", fontSize: 18, paddingTop: 5}}>{user.name}</Text>
                <Text style={{color: "white", opacity: 0.8, fontSize: 15}}>{user.instrument}</Text>
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={["#5994eb", "#00a7eb", "#00b3cb", "#00b996", "#59b85d"]} style={styles.panel}>

            <View>
                <Text style={{fontWeight: "300", letterSpacing: 5, textAlign: "center", color: "white"}}>CONGRATULATIONS</Text>
                <Text style={{fontSize: 45, fontWeight: "bold", color: "white", fontStyle: "italic"}}>It's a match</Text>
            </View>
            
            <View style={{flexDirection: "row", alignItems: "center",  justifyContent: "center"}}>
                <ProfileView user={loggedInProfile}/>
                <Ionicons name={"pulse-outline"} size={50} color={"white"} style={{marginHorizontal: -5, marginBottom: 45}}/>
                <ProfileView user={userSwiped}/>
            </View>
            
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity style={[styles.button, {}]} disabled={false} onPress={() => navigation.goBack()}>
                    <Text style={[styles.buttonText, {color: "#AC8887"}]}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {}]} disabled={false} onPress={() => {}}>
                    <Text style={[styles.buttonText, {color: COLORS.green}]}>Chat now</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    panel: {
        height: height*0.475,
        width: width*0.9,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white",
    },
    profilContainer: {
        alignItems: "center",
    },
    profilPicContainer: {
        borderWidth: 3,
        borderRadius: 95,
        borderColor: "white",
    },
    profilText: {

    },
    profilPic: {
        width: width*0.3,
        height: width*0.3,
        borderRadius: 95,
        margin: 2,
    },
    button: {
        backgroundColor: "white",
        height: width*0.125,
        width: width*0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        margin: 10,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 20,
        padding: 10,
    }
  });