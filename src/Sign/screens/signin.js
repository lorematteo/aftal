import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image, LogBox, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { CountryPicker } from 'react-native-country-codes-picker';

import { width, height, COLORS, Android } from '../../../utils/constants';
import { handleSignIn, onGoogleButtonPress } from '../../../utils/firebase';
import { useRoute } from '@react-navigation/native';

import { SocialBox } from "../components/socials";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function SignInScreen({ navigation }){

    const route = useRoute();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [eyestate, setEyestate] = useState(true);

    const [mailselected, setMailselected] = useState(true);

    const [showcountry, setShowcountry] = useState(false);
    const [countryCode, setCountryCode] = useState("+33");
    const [countryName, setCountryName] = useState("France");
    const [countryFlag, setCountryFlag] = useState("🇫🇷");

    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={[Android.SafeArea, {flex: 1, backgroundColor: "white"}]}>
            <View style={styles.container}>
                <View>
                <Text style={{
                    fontSize: 23,
                    color: COLORS.primary,
                    fontWeight: "bold",
                    paddingTop: (width/100)*8,
                }}>Welcome Back 👋</Text>
                <Text style={{
                    paddingTop: (width/100)*4,
                    fontSize: 14,
                    color: "black",
                }}>We happy to see you again. To use your account, you should log in first.</Text>
            </View>

            <View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {setMailselected(true)}} style={mailselected ? styles.buttonSelected : styles.button}>
                        <Text>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMailselected(false)}} style={mailselected ? styles.button : styles.buttonSelected}>
                        <Text>Phone number</Text>
                    </TouchableOpacity>
                </View>

                {mailselected ? 

                <View style={styles.inputPanel}>
                    <View style={styles.inputContainer}>
                        <TextInput autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                        <TouchableOpacity onPress={() => setEmail("")} style={{paddingLeft: 0,}}>
                            <Ionicons style={styles.iconcroix} color={COLORS.gray} name="close-circle-outline" size={width>380 ? 25 : 23}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
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
            
                : 
                
                <View style={styles.inputPanel}>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setShowcountry(true)}>
                        <Text style={{marginLeft: 30, marginRight: 15, marginVertical: 15}}>{countryFlag}</Text>
                        <Text>{countryName}</Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={{marginHorizontal: 25}}>{countryCode}</Text>
                        <View style={{width: 1, height: 20, backgroundColor: COLORS.gray}}/>
                        <TextInput autoCorrect={false} placeholder="Phone number" keyboardType={"number-pad"} maxLength={13}  onChangeText={text => setPhone(text)} style={styles.input}/>
                    </View>
                    <View style={{alignItems: 'flex-end', paddingRight: 20, paddingTop: 10, opacity: 0}}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{right: 0,}}>Forgot Password?</Text>
                        </TouchableOpacity>         
                    </View>
                </View>
                }

            </View>
            
            <View>

                <TouchableOpacity style={styles.loginButton} disabled={loading} onPress={() => {handleSignIn(email, password, setLoading, route.params.setDisconnected)}}>
                    { (loading) ? <ActivityIndicator size="small" color="white"/> : <Text style={{color: "white", fontWeight: "700"}}>Login</Text>}
                </TouchableOpacity>

                <SocialBox setDisconnected={route.params.setDisconnected}/>

                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{color: COLORS.gray}}>Don't have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUpMail")}>
                        <Text style={{color: COLORS.primary, fontWeight: "bold", marginLeft: 10}}>Sign up</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <CountryPicker
                show={showcountry}
                inputPlaceholder={"Entrez votre pays"}
                searchMessage={"Désolé, nous ne trouvons pas votre pays 😔"}
                lang="fr"
                enableModalAvoiding={true}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setCountryName(item.name["fr"]);
                setCountryFlag(item.flag);
                setShowcountry(false);
                }}
            />
            </View> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    buttonContainer: {
        backgroundColor: "#F3F6FF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 15,
        marginVertical: 30,
    },
    button: {
        width: width*0.4,
        height: width*0.12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    buttonSelected: {
        backgroundColor: "#FFFFFF",
        width: width*0.4,
        height: width*0.12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    inputContainer: {
        backgroundColor: "#F3F6FF",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    input: {
        paddingVertical: 15,
        paddingRight: 20,
        width: width*0.8,
        paddingLeft: 20,
    },
    loginButton: {
        height: height*0.07,
        backgroundColor: COLORS.primary,
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 25,
        marginBottom: height*0.05,
    },
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