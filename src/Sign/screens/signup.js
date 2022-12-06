import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView, LogBox, ActivityIndicator } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import LottieView from 'lottie-react-native';

import { width, height, COLORS, Android } from '../../../utils/constants';
import { SocialBox } from "../components/socials";
import { handleSignUp } from "../../../utils/firebase";

import defaultProfilPic from "../../../assets/defaultprofilpic.jpeg"
import { useRoute } from '@react-navigation/native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

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

    const route = useRoute();

    const defaultUri = Image.resolveAssetSource(defaultProfilPic).uri

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setCpass] = useState("");
    const [picture, setPicture] = useState(defaultUri);

    const [loading, setloading] = useState(false)
    const [step, setStep] = useState(0);

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    return (
        <SafeAreaView style={[Android.SafeArea, {flex: 1, backgroundColor: "white"}]}>
            <View style={[styles.container]}>

                {(step==0) ? 
                    <SetMailScreen email={email} setEmail={setEmail}/>
                :
                    (step==1) ? 
                        <SetNameScreen step={step} setStep={setStep} name={name} setName={setName}/>
                    :
                        (step==2) ?
                            <SetProfilPicScreen step={step} setStep={setStep} picture={picture} setPicture={setPicture}/>
                        :
                            (step==3) ?
                                <SetPasswordScreen step={step} setStep={setStep} password={password} setPassword={setPassword} cpass={cpass} setCpass={setCpass}/>
                            :

                                <CompleteScreen/>
                }

                <View>
                    <TouchableOpacity style={styles.loginButton} disabled={
                        loading || (step==0 && email=="") || 
                        (step==1 && name.length<2) || (step==2 && picture==defaultUri) || (step==3 && (password!=cpass || password==""))
                    }
                        onPress={async () => {
                        if(step==0 && validateEmail(email)){
                            setStep(step+1);
                        }
                        if(step==1 && (name.length>2)){
                            setStep(step+1);
                        }
                        if(step==2 && picture!=defaultUri){
                            setStep(step+1);
                        }
                        if(step==3 && password!="" && password==cpass){
                            handleSignUp(email, password, name, picture, setloading, step, setStep);
                        }
                        if(step==4){
                            route.params.setDisconnected(false);
                        }
                    }}>
                        {(loading) ? 
                            <ActivityIndicator size="small" color="white"/>
                        : 
                            <Text style={{color: "white", fontWeight: "700"}}>{(step>=4) ? "Start !" : "Next"}</Text>
                        }
                    </TouchableOpacity>  

                    {(step==0) ? <SocialBox setDisconnected={route.params.setDisconnected}/> : null}
                    
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
                    <TextInput autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text.toLowerCase())} style={styles.input}/>
                    <TouchableOpacity onPress={() => setEmail("")} style={{paddingLeft: 0,}}>
                        <Ionicons style={styles.iconcroix} color={COLORS.gray} name="close-circle-outline" size={width>380 ? 25 : 23}/>
                    </TouchableOpacity>
                </View>
            </View> 
        </View>
    )
}

function SetNameScreen({step, setStep, name, setName}){
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
                }} onPress={() => setStep(step-1)}>
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

function SetProfilPicScreen({step, setStep, picture, setPicture}){

    let actionSheet = useRef();

    const ChoosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true,
          }).then(image => {
            //console.log(image);
            setPicture(image.path);
          });
    };

    const TakePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true,
            useFrontCamera: true,
          }).then(image => {
            //console.log(image);
            setPicture(image.path);
          });
    }

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
                }} onPress={() => setStep(step-1)}>
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
                            }} source={{uri: picture}}/>
                    </View>
                    <TouchableOpacity onPress={() => actionSheet.current.show()}>
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
                            <Ionicons name="download-outline" size={width*0.07} color={COLORS.primary}/>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <ActionSheet
            ref={actionSheet}
            title={"Comment souhaitez vous importer votre photo ?"}
            options={["Prendre une photo","Choisir dans la galerie","Annuler"]}
            cancelButtonIndex={2}
            onPress={(index) => {
                if(index==0){
                    TakePhotoFromCamera()
                } if(index==1){
                    ChoosePhotoFromLibrary()
                }
            }}
            />
        </View>
    )
}

function SetPasswordScreen({step, setStep, password, setPassword, cpass, setCpass}){

    const [eyestate, setEyestate] = useState(true);

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
                }} onPress={() => setStep(step-1)}>
                <Ionicons name={"chevron-back-outline"} size={25} color={COLORS.primary}/>
            </TouchableOpacity>

            <Text style={{
                fontSize: 23,
                color: COLORS.primary,
                fontWeight: "bold",
                paddingTop: (width/100)*8,
            }}>
                Choose a password.
            </Text>
            <Text style={{
                paddingTop: (width/100)*4,
                fontSize: 14,
                color: "black",
            }}>
                Add a strong password to continue.
            </Text>

            <View style={styles.inputContainer}>
                        <TextInput autoCorrect={false} placeholder="Password" value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry={eyestate}/>
                        <TouchableOpacity onPress={() => setEyestate(!eyestate)} style={styles.iconcroix}>
                            <Ionicons color={COLORS.gray} name={eyestate ? "eye-off-outline" : "eye-outline"} size={width>380 ? 25 : 23}/>
                        </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                        <TextInput autoCorrect={false} placeholder="Confirm password" value={cpass} onChangeText={text => setCpass(text)} style={styles.input} secureTextEntry={true}/>
                        <Ionicons color={(password == cpass && cpass!="") ? COLORS.primary : COLORS.gray} name={(password == cpass && cpass!="") ? "checkmark-circle-outline" : ""} size={width>380 ? 25 : 23}/>
            </View>
        </View>
    )
}

function CompleteScreen(){

    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <View>
            <Text style={{
                fontSize: 23,
                color: COLORS.primary,
                fontWeight: "bold",
                paddingTop: (width/100)*8,
            }}>
                Account created ! 👌
            </Text>
            <Text style={{
                paddingTop: (width/100)*4,
                fontSize: 14,
                color: "black",
            }}>
                You can start using the app.
            </Text>
            <View style={{flexDirection: "row", justifyContent: "center", marginTop: height*0.15}}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                    width: 250,
                    height: 250,
                    }}
                    source={require("../../../assets/lotties/singing-and-playing.json")}
                />
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