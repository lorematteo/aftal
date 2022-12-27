import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';

import { COLORS, width, height } from '../../utils/constants';

export default function ChatScreen({ navigation }){

    const [message, setMessage] = useState("");

    const dumpMessage = [
        { id: 1, name: "Maria", emoji: "🤠", msg: "Hello it's Maria how are you mattéo i hope you are doing well bla bla bla bla", time: "5min ago", unread: 3},
        { id: 2, name: "Idriss", emoji: "🤓", msg: "Comment ca va gros ?", time: "1h ago", unread: 1},
        { id: 3, name: "Matthieu", emoji: "🤠", msg: "nan t'inquiete", time: "10h26", unread: 0},
        { id: 4, name: "Mattéo", emoji: "😎", msg: "faudra que l'on fassent ca et ca", time: "yesterday", unread: 0},
        { id: 5, name: "Lucas", emoji: "😎", msg: "ca avance bien mais je suis pas sur que ce soit la marche a suivre au pire on verra", time: "a week ago", unread: 0}
    ];


    return (
        <SafeAreaView style={{alignItems: "center", justifyContent: "space-between", flex: 1, backgroundColor: "white"}}>
                <View style={{flexDirection: "row", width: width, justifyContent: "space-between", paddingHorizontal: 25, paddingVertical: 10, alignItems: "center", backgroundColor: "white"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name={"chevron-back"} size={25} color={COLORS.gray}/>
                    </TouchableOpacity>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 21, fontWeight: "bold", color: COLORS.primary}}>Mattéo</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require("../../assets/defaultprofilpic.jpeg")} style={{width: width*0.1, height: width*0.1, borderRadius: 95}}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={dumpMessage}
                inverted={true}
                renderItem={({ item }) => <View><SenderMessage content={item.msg} time={item.time}/><ReceiverMessage content={item.msg} time={item.time}/></View>}
                numColumns={1}
                keyExtractor={(item) => item.id}
                style={{backgroundColor: COLORS.lightgray, width: width, padding: 15}}
                />
                <View style={styles.footer}>
                    <TextInput autoCorrect={true} placeholder="Your message" value={message} onChangeText={text => setMessage(text)} style={styles.input}/>
                    <TouchableOpacity onPress={() => console.log(message)} style={{marginRight: 20}}>
                        <Ionicons style={styles.iconsend} color={"black"} name="send-sharp" size={20}/>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

function ReceiverMessage({content, time}){
    
    const [showTime, setShowTime] = useState(false);
    return (
        <View>
            <Pressable style={styles.receiverBubble} onPress={() => setShowTime(!showTime)}>
                <Text style={{color: COLORS.primary}}>{content}</Text>
            </Pressable>
            { (showTime) ? <Text style={styles.receiverTime}>{time}</Text> : null}
            
        </View>
        
    )
}

function SenderMessage({content, time}){

    const [showTime, setShowTime] = useState(false);
    return (
        <View>
            <Pressable style={styles.senderBubble} onPress={() => setShowTime(!showTime)}>
                <Text style={{color: "white"}}>{content}</Text>
            </Pressable>
            { (showTime) ? <Text style={styles.senderTime}>{time}</Text> : null}
            
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