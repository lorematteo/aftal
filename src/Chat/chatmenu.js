import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';

import { COLORS, width, height } from '../../utils/constants';

export default function ChatMenuScreen({ navigation }){

    const dumpMessage = [
        { id: 1, name: "Maria", emoji: "🤠", msg: "Hello it's Maria how are you mattéo i hope you are doing well bla bla bla bla", time: "5min ago", unread: 3},
        { id: 2, name: "Idriss", emoji: "🤓", msg: "Comment ca va gros ?", time: "1h ago", unread: 1},
        { id: 3, name: "Matthieu", emoji: "🤠", msg: "nan t'inquiete", time: "10h26", unread: 0},
        { id: 4, name: "Mattéo", emoji: "😎", msg: "faudra que l'on fassent ca et ca", time: "yesterday", unread: 0},
        { id: 5, name: "Lucas", emoji: "😎", msg: "ca avance bien mais je suis pas sur que ce soit la marche a suivre au pire on verra", time: "a week ago", unread: 0}
    ];

    const dumpMatches = [{name: "1"}, {name: "2"}, {name: "3"}, {name: "4"}, {name: "5"}]

    return (
        <SafeAreaView style={styles.viewContainer}>
            <View style={{alignItems: "center", justifyContent: "space-between", flex: 1}}>
                <FlatList
                data={dumpMessage}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.title}>Chat</Text>
                            <Text style={styles.subtitle}>Discute avec tes tous derniers matchs !</Text>
                        </View>
                        <Text style={{color: COLORS.primary, paddingLeft: 10,}}>Recent Matches</Text>
                        <FlatList
                        data={dumpMatches}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({ item }) => <MatchCard profile={item.name} nav={navigation}/>}
                        numColumns={1}

                        keyExtractor={(item) => item.name}
                        style={{width: width, paddingTop: 5, paddingLeft: 5}}
                        />
                        <Text style={{color: COLORS.primary, paddingLeft: 10}}>Messages</Text>
                    </View>
                }
                renderItem={({ item }) => <ConversationRow conv={item}/>}
                numColumns={1}
                keyExtractor={(item) => item.id}
                style={{width: width, margin: 5}}
                />
            </View>
        </SafeAreaView>
    );
}

function ConversationRow({conv}){

    return (
        <View style={{flexDirection: "row", width: width, padding: 10}}>
            <Image source={require("../../assets/defaultprofilpic.jpeg")} style={{width: width*0.15, height: width*0.15, borderRadius: 95, marginRight: 5}}/>
            <View style={{ justifyContent: "center", padding: 5, width: width*0.775}}>
                <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <Text style={{fontSize:16, fontWeight: "600", }}>{conv.name}</Text>
                    <Text style={{fontSize: 10, color: COLORS.gray, opacity: 0.7}}>{conv.time}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 13, color: COLORS.gray}}>{conv.msg.length > 35 ? conv.msg.substring(0, 35).trim()+" ..." : conv.msg}</Text>
                    {conv.unread==0 ? 
                    <Ionicons name={"checkmark-done-outline"} size={15} color={COLORS.gray} style={{opacity: 0.4}}/>
                        :
                    <View style={{width: 30, padding: 4, backgroundColor: COLORS.primary, borderRadius: 25, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 12, color: "white", fontWeight: "bold"}}>{conv.unread}</Text>
                    </View>
                    }
                    
                    
                </View>
            </View>
        </View>
    )
}

function MatchCard({profile, nav}){

    return (
        <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 5, alignItems: "center", justifyContent: "center"}} onPress={() => nav.navigate("ChatScreen")}>
            <Image source={require("../../assets/1.jpeg")} style={{width: width*0.3, height: width*0.4, borderRadius: 15}}/>
            <Text style={{fontSize: 16, fontWeight: "400", margin: 5}}>Maria</Text>
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