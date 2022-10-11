import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const phoneWidth = Dimensions.get('window').width;
const phoneHeight = Dimensions.get('window').height;

const image = { uri: "https://api.nawak.me/render/630553/w600" };

export default function HomeScreen(){
    return (
        <View style={styles.appContainer}>
          <View style={styles.topBar}>
            <Ionicons name="person-circle" size={25}/>
            <Text>Aftal</Text>
            <Ionicons name="settings" size={25}/>
          </View>
          <View style={styles.matchContainer}>
            <View style={styles.matchCard}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            </ImageBackground>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
      backgroundColor: "white",
      paddingHorizontal: phoneWidth*0.01,
      paddingTop: phoneHeight*0.05,
      flex: 1,
    },
    topBar : {
      backgroundColor: "white",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      paddingHorizontal: phoneWidth*0.05,
    },
    matchContainer: {
      backgroundColor: "white",
      justifyContent: "center",
      flex: 1,
    },
    matchCard: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      margin: 10,
      borderRadius: 25,
      overflow: 'hidden'
    },
  });