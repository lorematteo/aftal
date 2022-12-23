import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MaskInput, { Masks } from 'react-native-mask-input';
import ImagePicker from 'react-native-image-crop-picker';

import { COLORS, width, height } from "../../../utils/constants";
import { addUserToDB, uploadImage } from "../../../utils/firebase";
import auth, { firebase } from "@react-native-firebase/auth";

export default function CardSetupScreen( {navigation} ) {

  const user = firebase.auth().currentUser;

  const [instrument, setInstrument] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture1, setPicture1] = useState("");
  const [picture2, setPicture2] = useState("");
  const [picture3, setPicture3] = useState("");
  const [loading, setLoading] = useState(false);

  function ChoosePhotoFromLibrary(index){
    ImagePicker.openPicker({
        width: 600,
        height: 848,
      }).then(image => {
        //console.log(image);
        if(picture1==""){
            setPicture1(image.path);
        } else {
            if (picture2==""){
                setPicture2(image.path);
            } else {
                if(picture3==""){
                    setPicture3(image.path);
                } else {
                    if(index==1){
                        setPicture1(image.path);
                    } else{
                        if(index==2){
                            setPicture2(image.path);
                        } else {
                            setPicture3(image.path);
                        }
                    }
                }
            }
        }
      });
    };

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={styles.container}>

            <Text style={{
                    fontSize: 23,
                    color: COLORS.primary,
                    fontWeight: "bold",
                    paddingTop: (width/100)*8,
                    marginBottom: 35,
                }}>
                    Just a few more things ...
            </Text>

        
            <View style={styles.profilParameter}>
                <Text style={{
                    paddingTop: (width/100)*4,
                    fontSize: 14,
                    color: "black",
                }}>
                    Add your birthdate.
                </Text>

                <View style={styles.inputPanel}>
                    <View style={styles.inputContainer}>
                    <MaskInput
                        placeholder="dd/mm/yyyy"
                        mask={Masks.DATE_DDMMYYYY}
                        onChangeText={(text) => setBirthdate(text)}
                        value={birthdate}
                        keyboardType={"number-pad"}
                        style={styles.input}
                    />
                    </View>
                </View>
            </View>

            <View style={styles.profilParameter}>
                <Text style={{
                    paddingTop: (width/100)*4,
                    fontSize: 14,
                    color: "black",
                }}>
                    Add some photos.
                </Text>

                <View style={{flexDirection: "row", marginVertical: 10}}>
                    <TouchableOpacity onPress={() => ChoosePhotoFromLibrary(1)}>
                        { picture1 == "" ?
                            <View style={styles.pictureBox}><Ionicons name={"add"} size={25} color={COLORS.gray} style={styles.addPicture}/></View>
                            :
                            <Image style={styles.pictureBox} source={{uri: picture1}}/>
                        }
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => ChoosePhotoFromLibrary(2)}>
                        { picture2 == "" ?
                            <View style={styles.pictureBox}><Ionicons name={"add"} size={25} color={COLORS.gray} style={styles.addPicture}/></View>
                            :
                            <Image style={styles.pictureBox} source={{uri: picture2}}/>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ChoosePhotoFromLibrary(3)}>
                        { picture3 == "" ?
                            <View style={styles.pictureBox}><Ionicons name={"add"} size={25} color={COLORS.gray} style={styles.addPicture}/></View>
                            :
                            <Image style={styles.pictureBox} source={{uri: picture3}}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.profilParameter}>
                <Text style={{
                    paddingTop: (width/100)*4,
                    fontSize: 14,
                    color: "black",
                }}>
                    Add a your favorite instrument.
                </Text>

                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Ionicons name={"heart-circle-outline"} size={25} color={COLORS.primary} style={{marginHorizontal: 5}}/>
                    <View style={styles.inputContainer}>
                        <TextInput autoCorrect={false} placeholder="Piano" value={instrument} onChangeText={text => setInstrument(text)} style={styles.input}/>
                    </View>
                </View>
            </View>
            
            <TouchableOpacity style={styles.doneButton} disabled={false} onPress={() => {
                if(birthdate.length==10){
                    if(picture1!=""){
                        if(instrument!=""){
                            setLoading(true);
                            uploadImage(picture1, "i1"+user.uid, user.uid).then(url => setPicture1(url));
                            if(picture2!=""){
                                uploadImage(picture2, "i2"+user.uid, user.uid).then(url => setPicture2(url));
                            }
                            if(picture3!=""){
                                uploadImage(picture3, "i3"+user.uid, user.uid).then(url => setPicture3(url));
                            }
                            addUserToDB(setLoading, user.uid, user.displayName, user.photoURL, birthdate, picture1, picture2, picture3, instrument);
                            navigation.goBack();
                        }
                    }
                }
            }}>
                {(loading) ? 
                    <ActivityIndicator size="small" color="white"/>
                    : 
                    <Text style={{color: "white", fontWeight: "700"}}>Let's match !</Text>
                }
            </TouchableOpacity>
        </View>      
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
  },
  profilParameter: {
    marginVertical: 10,
  },
  inputContainer: {
      backgroundColor: "#F3F6FF",
      borderRadius: 15, // 10
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
  },
  input: {
      paddingVertical: 15, // 15
      paddingRight: 20,
      width: width*0.8,
      paddingLeft: 20,
  },
  doneButton: {
      height: height*0.05,
      backgroundColor: COLORS.primary,
      fontSize: 14,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginVertical: 25,
      marginBottom: height*0.07,
  },
  pictureBox: {
    width: width*0.25,
    height: height*0.15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
});