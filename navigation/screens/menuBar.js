import { StyleSheet, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function MenuBar({cmd1, cmd2}){
  return (
    <View style={styles.menuBar}>
      <Ionicons name="copy" size={SCREEN_WIDTH*0.07} onPress={cmd1} color={"#232323"} style={styles.tabBarImage}/>
      <Ionicons name="compass" size={SCREEN_WIDTH*0.07} onPress={cmd2} color={"#8A8993"} style={styles.tabBarImage}/>
      <Ionicons name="chatbubbles" size={SCREEN_WIDTH*0.07} color={"#8A8993"} style={styles.tabBarImage}/>
      <Ionicons name="person" size={SCREEN_WIDTH*0.07} color={"#8A8993"} style={styles.tabBarImage}/>
    </View>
  )
};

  const styles = StyleSheet.create({
    menuBar: {
      width: SCREEN_WIDTH,
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      paddingHorizontal: SCREEN_WIDTH*0.1,
      paddingVertical: SCREEN_HEIGHT<700 ? SCREEN_HEIGHT*0.02 : 0,
    },
  });