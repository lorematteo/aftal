import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import TimeAgo from '@andordavoti/react-native-timeago';

import { COLORS, width, height } from '../../utils/constants';

export default function ChatMenuScreen({ navigation }){
    
    const user = firebase.auth().currentUser;
    const [matches, setMatches] = useState("");

    const dumpMatches = [{name: "1"}, {name: "2"}, {name: "3"}, {name: "4"}, {name: "5"}]

    useEffect(() => {
        const sub = firestore()
            .collection("matches")
            .where("usersMatched", "array-contains", user.uid)
            .onSnapshot(snapshot => {
                setMatches(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            })
        return () => sub();
    }, [user]);
    

    return (
        <SafeAreaView style={styles.viewContainer}>
            <View style={{alignItems: "center", justifyContent: "space-between", flex: 1}}>
                <FlatList
                data={matches}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.title}>Chat</Text>
                            <Text style={styles.subtitle}>Discute avec tes tous derniers matchs !</Text>
                        </View>
                        <Text style={{color: COLORS.primary, paddingLeft: 10,}}>Recent Matches</Text>
                        <FlatList
                        data={matches}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({ item }) => <MatchCard nav={navigation} matchDetails={item} userId={user.uid}/>}
                        numColumns={1}

                        keyExtractor={(item) => item.id}
                        style={{width: width, paddingTop: 5, paddingLeft: 5}}
                        />
                        <Text style={{color: COLORS.primary, paddingLeft: 10}}>Messages</Text>
                    </View>
                }
                renderItem={({ item }) => <ConversationRow nav={navigation} matchDetails={item} userId={user.uid}/>}
                numColumns={1}
                keyExtractor={(item) => item.id}
                style={{width: width, margin: 5}}
                />
            </View>
        </SafeAreaView>
    );
}

function ConversationRow({nav, matchDetails, userId}){

    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    const getMatchedUserInfos = (users, userLoggedInID) => {
        const newUsers = {...users};
        delete newUsers[userLoggedInID];

        const [id, user] = Object.entries(newUsers).flat();

        return { id, ...user };
    }

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfos(matchDetails.users, userId))
    }, [matchDetails, userId])

    useEffect(() => {firestore().collection("matches").doc(matchDetails.id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        setLastMessage(snapshot.docs[0]?.data()?.message)
    })}, [matchDetails])

    return (
        <TouchableOpacity style={{flexDirection: "row", width: width, padding: 10}} onPress={() => nav.navigate("ChatScreen", {matchDetails})}>
            <Image source={{uri: matchedUserInfo?.profilpic}} style={{width: width*0.15, height: width*0.15, borderRadius: 95, marginRight: 5}}/>
            <View style={{ justifyContent: "center", padding: 5, width: width*0.775}}>
                <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <Text style={{fontSize:16, fontWeight: "600", }}>{matchedUserInfo?.name}</Text>
                    <TimeAgo dateTo={new Date(matchDetails?.timestamp["seconds"]*1000)} style={{fontSize: 10, color: COLORS.gray, opacity: 0.7}}/>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 13, color: COLORS.gray}}>{lastMessage!="" ? lastMessage > 35 ? lastMessage.substring(0, 35).trim()+" ..." : lastMessage : "Say hi !"}</Text>
                    {/* {matchDetails.unread==0 ? 
                    <Ionicons name={"checkmark-done-outline"} size={15} color={COLORS.gray} style={{opacity: 0.4}}/>
                        :
                    <View style={{width: 30, padding: 4, backgroundColor: COLORS.primary, borderRadius: 25, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 12, color: "white", fontWeight: "bold"}}>{matchDetails.unread}</Text>
                    </View>
                    }*/}
                    
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}

function MatchCard({nav, matchDetails, userId}){

    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    const getMatchedUserInfos = (users, userLoggedInID) => {
        const newUsers = {...users};
        delete newUsers[userLoggedInID];

        const [id, user] = Object.entries(newUsers).flat();

        return { id, ...user };
    }

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfos(matchDetails.users, userId))
    }, [matchDetails, userId])

    return (
        <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 5, alignItems: "center", justifyContent: "center"}} onPress={() => nav.navigate("ChatScreen", {matchDetails})}>
            <Image source={{uri: matchedUserInfo?.picture1}} style={{width: width*0.3, height: width*0.4, borderRadius: 10}}/>
            <Text style={{fontSize: 16, fontWeight: "400", margin: 5}}>{matchedUserInfo?.name}</Text>
        </TouchableOpacity>
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
    }
});