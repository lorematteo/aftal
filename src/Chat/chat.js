import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import TimeAgo from '@andordavoti/react-native-timeago';

import { COLORS, width, height } from '../../utils/constants';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen({ navigation }){

    const user = firebase.auth().currentUser;
    const route = useRoute();
    const {matchDetails} = route.params;

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const dumpMessage = [
        { id: 1, name: "Maria", emoji: "🤠", msg: "Hello it's Maria how are you mattéo i hope you are doing well bla bla bla bla", time: "5min ago", unread: 3},
        { id: 2, name: "Idriss", emoji: "🤓", msg: "Comment ca va gros ?", time: "1h ago", unread: 1},
        { id: 3, name: "Matthieu", emoji: "🤠", msg: "nan t'inquiete", time: "10h26", unread: 0},
        { id: 4, name: "Mattéo", emoji: "😎", msg: "faudra que l'on fassent ca et ca", time: "yesterday", unread: 0},
        { id: 5, name: "Lucas", emoji: "😎", msg: "ca avance bien mais je suis pas sur que ce soit la marche a suivre au pire on verra", time: "a week ago", unread: 0}
    ];

    const getMatchedUserInfos = (users, userLoggedInID) => {
        const newUsers = {...users};
        delete newUsers[userLoggedInID];

        const [id, user] = Object.entries(newUsers).flat();

        return { id, ...user };
    }

    const sendMessage = () => {
        firestore()
        .collection("matches")
        .doc(matchDetails.id)
        .collection("messages")
        .add({
            timestamp: firestore.FieldValue.serverTimestamp(),
            userId: user.uid,
            name: user.displayName,
            profilpic: user.photoURL,
            message: input,
        })
        .then(() => {
            console.log('message sent!');
            setInput("");
        });
    }

    useEffect(() => {
        firestore()
        .collection("matches")
        .doc(matchDetails.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })))
        });
    }, [matchDetails])

    return (
        <SafeAreaView style={{alignItems: "center", justifyContent: "space-between", flex: 1, backgroundColor: "white"}}>
                <View style={{flexDirection: "row", width: width, justifyContent: "space-between", paddingHorizontal: 25, paddingVertical: 10, alignItems: "center", backgroundColor: "white"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name={"chevron-back"} size={25} color={COLORS.gray}/>
                    </TouchableOpacity>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 21, fontWeight: "bold", color: COLORS.primary}}>{getMatchedUserInfos(matchDetails.users, user.uid).name}</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={{uri: getMatchedUserInfos(matchDetails.users, user.uid).profilpic}} style={{width: width*0.1, height: width*0.1, borderRadius: 95}}/>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{flex: 1}}>
                    <FlatList
                    data={messages}
                    inverted={true}
                    renderItem={({ item: message }) => 
                        message.userId == user.uid ?
                            <SenderMessage key={message.id} message={message}/>
                        :
                            <ReceiverMessage key={message.id} message={message}/>
                    }
                    numColumns={1}
                    keyExtractor={(item) => item.id}
                    style={{backgroundColor: COLORS.lightgray, width: width, padding: 15}}
                    />
                    <View style={styles.footer}>
                        <TextInput autoCorrect={true} placeholder="Your message" value={input} onChangeText={text => setInput(text)} style={styles.input}/>
                        <TouchableOpacity onPress={() => sendMessage()} style={{marginRight: 20}}>
                            <Ionicons style={styles.iconsend} color={"black"} name="send-sharp" size={20}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                
        </SafeAreaView>
    );
}

function ReceiverMessage({ message }){
    
    const [showTime, setShowTime] = useState(false);
    const time = new Date(message.timestamp["seconds"]*1000);

    return (
        <View>
            <Pressable style={styles.receiverBubble} onPress={() => {setShowTime(true); setTimeout(() => {setShowTime(false)}, 2000)}}>
                <Text style={{color: COLORS.primary}}>{message.message}</Text>
            </Pressable>
            { (showTime) ? <TimeAgo dateTo={time} style={styles.receiverTime}/> : null}
            
        </View>
    )
}

function SenderMessage({ message }){

    const [showTime, setShowTime] = useState(false);
    const time = new Date(message.timestamp != null ? message.timestamp["seconds"]*1000 : 0);

    return (
        <View>
            <Pressable style={styles.senderBubble} onPress={() => {setShowTime(true); setTimeout(() => {setShowTime(false)}, 2000)}}>
                <Text style={{color: "white"}}>{message.message}</Text>
            </Pressable>
            { (showTime) ? <TimeAgo dateTo={time ? time : 0} style={styles.senderTime}/> : null}
            
        </View>
        
    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 35,
        fontWeight: "500",
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.gray,
    },
    footer: {
        flexDirection: "row",
        backgroundColor: COLORS.lightgray,
        alignItems: "center",
        borderRadius: 95,
        margin: 10,
    },
    input: {
        paddingVertical: 15,
        paddingRight: 20,
        width: width*0.8,
        paddingLeft: 20,
        flex: 1,
    },
    receiverBubble: {
        backgroundColor: COLORS.lightprimary,
        alignSelf: "flex-start",
        marginRight: "auto",
        marginRight: width*0.15,
        padding: 10,
        borderRadius: 15,
        margin: 5,
        borderBottomLeftRadius: 0,
    },
    senderBubble: {
        backgroundColor: COLORS.primary,
        alignSelf: "flex-end",
        marginLeft: "auto",
        marginLeft: width*0.15,
        padding: 10,
        borderRadius: 15,
        margin: 5,
        borderBottomRightRadius: 0,
    },
    senderTime: {
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: -5,
        fontSize: 11,
        opacity: 0.8,
        color: COLORS.gray,
    },
    receiverTime: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginTop: -5,
        fontSize: 11,
        opacity: 0.8,
        color: COLORS.gray,
    }
});