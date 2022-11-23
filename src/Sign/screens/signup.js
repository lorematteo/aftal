import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { width, height, COLORS, Android } from '../../../utils/constants';

import { SocialBox } from "../components/socials";

function convertHex(hexCode, opacity = 1){
    var hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);

    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;   
    }
    
    return 'rgba('+r+','+g+','+b+','+opacity+')';
}

export default function SignUpMail({ navigation }){

    const [email, setEmail] = useState("");
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");

    return (
        <SafeAreaView style={[Android.SafeArea, {flex: 1, backgroundColor: "white"}]}>
            <View style={[styles.container]}>

                {(step==0) ? 
                    <SetMailScreen email={email} setEmail={setEmail}/>
                :
                    (step==1) ? 
                        <SetNameScreen setStep={setStep} name={name} setName={setName}/>
                    :
                        <SetProfilPicScreen setStep={setStep}/>
                }

                <View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => setStep(step+1)}>
                        <Text style={{color: "white", fontWeight: "700"}}>Next</Text>
                    </TouchableOpacity>  

                    {(step==0) ? <SocialBox/> : null}
                    
                    {(step==0) ? 
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Text style={{color: COLORS.gray}}>Already have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                            <Text style={{color: COLORS.primary, fontWeight: "bold", marginLeft: 10}}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                </View>
                
            </View>
        </SafeAreaView>
    );
};

function SetMailScreen({ email, setEmail}){
    return (
        <View>
            <Text style={{
                fontSize: 23,
                color: COLORS.primary,
                fontWeight: "bold",
                paddingTop: (width/100)*8,
            }}>
                Create New Account 🔥
            </Text>
            <Text style={{
                paddingTop: (width/100)*4,
                fontSize: 14,
                color: "black",
            }}>
                Please fill in the form to continue.
            </Text>

            <View style={styles.inputPanel}>
                <View style={styles.inputContainer}>
                    <TextInput autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                    <TouchableOpacity onPress={() => setEmail("")} style={{paddingLeft: 0,}}>
                        <Ionicons style={styles.iconcroix} color={COLORS.gray} name="close-circle-outline" size={width>380 ? 25 : 23}/>
                    </TouchableOpacity>
                </View>
            </View> 
        </View>
    )
}

function SetNameScreen({setStep, name, setName}){
    return (
        <View style={{flex: 1}}>

            <TouchableOpacity style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center", 
                borderRadius: 15,
                borderColor: convertHex(COLORS.primary),
                borderWidth: 1,
                }} onPress={() => setStep(0)}>
                <Ionicons name={"chevron-back-outline"} size={25} color={COLORS.primary}/>
            </TouchableOpacity>

            <Text style={{
                fontSize: 23,
                color: COLORS.primary,
                fontWeight: "bold",
                paddingTop: (width/100)*8,
            }}>
                How should whe call you ?
            </Text>
            <Text style={{
                paddingTop: (width/100)*4,
                fontSize: 14,
                color: "black",
            }}>
                Add a name to continue.
            </Text>

            <View style={styles.inputPanel}>
                <View style={styles.inputContainer}>
                    <TextInput autoCorrect={false} placeholder="Name" value={name} onChangeText={text => setName(text)} style={styles.input}/>
                </View>
            </View>
        </View>
    )
}

function SetProfilPicScreen({setStep}){
    return (
        <View style={{flex: 1}}>

            <TouchableOpacity style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center", 
                borderRadius: 15,
                borderColor: convertHex(COLORS.primary),
                borderWidth: 1,
                }} onPress={() => setStep(1)}>
                <Ionicons name={"chevron-back-outline"} size={25} color={COLORS.primary}/>
            </TouchableOpacity>

            <Text style={{
                fontSize: 23,
                color: COLORS.primary,
                fontWeight: "bold",
                paddingTop: (width/100)*8,
            }}>
                Add photo
            </Text>
            <Text style={{
                paddingTop: (width/100)*4,
                fontSize: 14,
                color: "black",
            }}>
                Add a photo to continue.
            </Text>

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View>
                    <View style={{borderWidth: 3, borderRadius: 95, borderColor: COLORS.primary}}>
                        <Image style={{
                            width: width*0.45,
                            height: width*0.45,
                            borderRadius: 95,
                            margin: 2,
                            }} source={require("../../../assets/2.jpeg")}/>
                    </View>
                    <View style={{
                        backgroundColor: "#F2F6FF",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: width*0.13,
                        height: width*0.13,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 95,
                    }}>
                        <Ionicons name="trash-outline" size={width*0.07} color={COLORS.primary}/>
                    </View>
                </View>
                
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    inputContainer: {
        backgroundColor: "#F3F6FF",
        borderRadius: 15, // 10
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginTop: height*0.07,
    },
    input: {
        paddingVertical: 25, // 15
        paddingRight: 20,
        width: width*0.8,
        paddingLeft: 20,
    },
    loginButton: {
        height: height*0.08,
        backgroundColor: COLORS.primary,
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 25,
        marginBottom: height*0.07,
    },
});