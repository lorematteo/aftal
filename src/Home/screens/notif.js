import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from "react-native";

import { width, height, COLORS } from "../../../utils/constants";
import { notifs as notifsObj } from "../data";

export default function NotifScreen({navigation}) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Ionicons style={{width: width*0.9, left: 0}} name={"arrow-back"} size={25}/>
        </TouchableOpacity>
        <View style={{alignItems: "center", justifyContent: "space-between"}}>
                <FlatList
                data={notifsObj}
                ListHeaderComponent={<Text>Notifications</Text>}
                renderItem={({ item }) => <NotifItem/>}
                numColumns={1}
                keyExtractor={(item) => item.name}
                style={{width: width, padding: 5}}
                />
        </View>
      </View>
    );
}

function NotifItem(){
  return (
    <View style={styles.notifContainer}>
      <View style={{backgroundColor: "#6355EA", padding: 10, borderRadius: 95, marginRight: 15,}}>
        <Ionicons name="musical-note" color={"white"} size={15}/>
      </View>
      <Text>Julie à aimée votre profil.</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
      padding: 30,
  },
  notifContainer: {
    flexDirection: "row",
    marginVertical: 5,
    height: height*0.07,
    width: width*0.8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
  },

});