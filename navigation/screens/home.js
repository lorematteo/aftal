import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const image = { uri: "https://api.nawak.me/render/630553/w600" };
const profiles = [
  { id: "1", uri: require('../../assets/1.jpeg') },
  { id: "2", uri: require('../../assets/3.jpeg') },
  { id: "4", uri: require('../../assets/4.jpeg') },
  { id: "5", uri: require('../../assets/5.jpeg') },
]

export default function HomeScreen(){
    return (
        <View style={styles.appContainer}>
          <View style={styles.topBar}>
            <Ionicons name="person-circle" size={25}/>
            <Text>Aftal</Text>
            <Ionicons name="settings" size={25}/>
          </View>
          <SwipeCards />
        </View>
    );
}

class SwipeCards extends React.Component {

  constructor() {
    super();
    this.position = new Animated.ValueXY();
  };

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
      onPanResponderRelease: (evt, gestureState) => {
      }
    })
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {
            profiles.map((item, i) => {
              return (
                <Animated.View key={i} style={styles.matchCard}>
                  <Image style={styles.image} source={item.uri}/>
                </Animated.View>
              );
            })
          }
        </View>
      </View>
    );
  };

}

const styles = StyleSheet.create({
    appContainer: {
      backgroundColor: "white",
      paddingTop: SCREEN_HEIGHT*0.05,
      flex: 1,
    },
    topBar : {
      backgroundColor: "white",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      paddingHorizontal: SCREEN_WIDTH*0.05,
      height: SCREEN_HEIGHT*0.06,
    },
    matchContainer: {
      backgroundColor: "white",
      justifyContent: "center",
      flex: 1,
    },
    matchCard: {
      flex: 1,
      height: SCREEN_HEIGHT*0.8,
      width: SCREEN_WIDTH,
      position: "absolute",
      padding: 10,
    },
    image: {
      flex: 1,
      borderRadius: 25,
      height: null,
      width: null,
      resizeMode: "cover",
    },
  });