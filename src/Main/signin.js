import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

import { width, height, COLORS } from '../../utils/constants';
import { handleSignUp, handleSignIn } from '../../utils/firebase';

export default function SignScreen(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyestate, setEyestate] = useState(true)

    return (
       /* <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image style={styles.logo} source={require("../../assets/logo.png")}/>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                <TextInput placeholder="Password" value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {handleSignIn(email, password)}} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {handleSignUp(email, password)}} style={[styles.button, styles.buttonOutLine]}>
                    <Text style={styles.buttonOutLineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>*/
        <View style={styles.container}>

            <View>
                <Text style={styles.text}>Welcome Back 👋</Text>
                <Text style={styles.subtext}>We happy to see you again. To use your account, you should log in first.</Text>
            </View>

            <View style={styles.box2}>
                <View style={styles.subbox2}>
                    <TouchableOpacity onPress={() => {}} style={styles.bl}>
                        <Text style={{}}>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.br}>
                        <Text>Phone number</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.subbox22}>
                        <TextInput autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                        <TouchableOpacity onPress={() => setEmail("")} style={{paddingLeft: 0,}}>
                            <Ionicons style={styles.iconcroix} color={COLORS.gray} name="close-circle-outline" size={width>380 ? 25 : 23}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subbox23}>
                        <TextInput autoCorrect={false} placeholder="Password" value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry={eyestate}/>
                        <TouchableOpacity onPress={() => setEyestate(!eyestate)} style={styles.iconcroix}>
                            <Ionicons color={COLORS.gray} name={eyestate ? "eye-off-outline" : "eye-outline"} size={width>380 ? 25 : 23}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'flex-end', paddingRight: 20, paddingTop: 10,}}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{right: 0,}}>Forgot Password?</Text>
                        </TouchableOpacity>         
                    </View>
                </View>
            </View>

            <View style={styles.box3}>
                <TouchableOpacity style={styles.login} onPress={() => {handleSignIn(email, password)}}>
                    <Text style={{color: "white"}}>Login</Text>
                </TouchableOpacity>   
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        //padding: 25,
        padding: (width/100)*5,
    },
    box2: {
        flexDirection: "column",
        //padding: 25,
        paddingTop: (width/100)*14,
    },
    box3: {
        flexDirection: "column",
        marginTop: 25,
        height: height*0.07,
        //paddingBottom: height*0.05,
    },
    subbox2: {
        backgroundColor: "#F3F6FF",
        //flex: 1,
        flexDirection: "row",
        //padding: 25,
        paddingVertical: (width/100)*2,
        justifyContent: "space-around",
        height: (height/100)*5 + (width/100)*4,
        borderRadius: 10,
    },
    subbox22: {
        backgroundColor: "#F3F6FF",
        //paddingVertical: 15,
        borderRadius: 10,
        marginTop: height*0.04,
        //heigh: height*0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    subbox23: {
        backgroundColor: "#F3F6FF",
        //paddingVertical: 15,
        borderRadius: 10,
        marginTop: height*0.025,
        //heigh: height*0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 23,
        color: COLORS.primary,
        fontWeight: "bold",
        //paddingTop: 25,
        paddingTop: (width/100)*8,
    },
    subtext: {
        paddingTop: (width/100)*4,
        fontSize: 14,
        color: "black",
    },
    bl: {
        //marginLeft: (width/100)*2,
        //marginRight: (width/100)*1,
        backgroundColor: "#FFFFFF",
        width: (width/100)*42,
        height: (height/100)*5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    br: {
        //marginRight: (width/100)*2,
        //marginLeft: (width/100)*1,
        width: (width/100)*42,
        height: (height/100)*5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        //marginRight: (width/100)*2,
        //marginLeft: (width/100)*1,
        backgroundColor: "#F3F6FF",
        paddingVertical: 15,
        paddingRight: 20,
        borderRadius: 10,
        width: width*0.8,
        paddingLeft: 20,
        //marginHorizontal: (width/100)*2,
        //marginVertical: height*0.05,
    },
    iconcroix: {
        paddingLeft: 5,
    },
    login: {
        flex: 1,
        backgroundColor: COLORS.primary,
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        //height: height*0.1,
    },
});