import { StyleSheet, Text, View, Animated, Image, PanResponder, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

import MatchCardShape from './matchCardShape';


const profiles = [
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "6", uri: require("../../assets/1.jpeg") },
  { id: "7", uri: require("../../assets/2.jpeg") },
  { id: "8", uri: require("../../assets/3.jpeg") },
  { id: "9", uri: require("../../assets/4.jpeg") },
  { id: "10", uri: require("../../assets/5.jpeg") },
];



export default function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <TopBar />
      <View>
        <View style={styles.matchCard}>
          <SwipeCards/>
        </View>
        <MusicPlayer/>
        <ButtonBar/>
      </View>
    </View>
  );
}

class SwipeCards extends React.Component {
  constructor() {
    super();

    // Card position
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.state = { currentIndex: 0 };

    // Card dragging animation
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };

    // Card labels opacity animation
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });

    // Next card animation
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    });

    // Card dragging handler
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // RIGHT
        if (gestureState.dx > 120) {
          Animated.timing(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy + 50 },
            useNativeDriver: true,
            duration: 250,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        // LEFT
        } else if (gestureState.dx < -120) {
          Animated.timing(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy + 50 },
            useNativeDriver: true,
            duration: 250,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        // MIDDLE
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  render() {
    return (
      <View>
        <View>
          {profiles
            .map((item, i) => {
              if (i < this.state.currentIndex) {
                return null;
              } if (i == this.state.currentIndex) {
                return (
                  <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={i}
                    style={[this.rotateAndTranslate, styles.matchCard, {position: "absolute"}]}
                  >
                    <Animated.View
                      style={{
                        opacity: this.likeOpacity,
                        transform: [{ rotate: "-30deg" }],
                        position: "absolute",
                        top: 50,
                        left: 40,
                        zIndex: 1000,
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 4,
                          borderColor: "green",
                          borderRadius: 25,
                          color: "green",
                          fontSize: 32,
                          fontWeight: "800",
                          padding: 10,
                        }}
                      >
                        LIKE
                      </Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        opacity: this.nopeOpacity,
                        transform: [{ rotate: "30deg" }],
                        position: "absolute",
                        top: 50,
                        right: 40,
                        zIndex: 1000,
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 4,
                          borderColor: "red",
                          borderRadius: 25,
                          color: "red",
                          fontSize: 32,
                          fontWeight: "800",
                          padding: 10,
                        }}
                      >
                        NOPE
                      </Text>
                    </Animated.View>
                    <MatchCardShape image={item.uri}/>
                  </Animated.View>
                );
              } else {
                return (
                  <Animated.View
                    key={i}
                    style={[
                      styles.matchCard,
                      {
                        opacity: this.nextCardOpacity,
                        transform: [{ scale: this.nextCardScale }],
                        position: "absolute",
                      },
                    ]}
                  >
                    <MatchCardShape image={item.uri}/>
                  </Animated.View>
                );
              }
            })
            .reverse()}
        </View>
      </View>
    );
  }
}

const TextPanel = (props) => (
  <View style={styles.textPanel}>
    <Text style={{fontSize: 25, color: "white"}}>Prénom, 21</Text>
  </View>
);


/// MUSIC PLAYER

const MusicPlayer = (props) => (
  <View style={{flexDirection:"row", justifyContent: "center", top: -70}}>
    <View style={styles.musicPlayer}>
      <View style={{
        padding: 4,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 95,
      }}>
        <View style={{
        backgroundColor: "black",
        padding: SCREEN_WIDTH*0.03,
        borderRadius: 95,
        }}>
          <Ionicons name="pause-outline" size={40} color={"white"}/>
        </View>
      </View>
    </View>
  </View>
);




/// TOP BAR
const TopBar = (props) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  }}>
    <Image style={styles.profilPic} source={require("../../assets/2.jpeg")}/>
    <Text style={{fontSize: 20}}>Hi, </Text>
    <Text style={{fontSize: 20, fontWeight: "bold"}}>Mattéo</Text>

    <View style={{flex:1}}></View>

    <Ionicons name="location" size={25}/>
    <Ionicons style={{marginLeft: 10}} name="notifications" size={25}/>
  </View>
);




/// BUTTON BAR
const ButtonBar = (props) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH*0.9,
    justifyContent: "space-around",
    marginTop: SCREEN_HEIGHT*0.03,
  }}>
    <View style={{
      backgroundColor: "#FB7B72",
      padding: 15,
      borderRadius: 95,
    }}>
      <Ionicons name="close" size={40} color="white"/>
    </View>
    <Text style={{fontSize: 35}}>👋</Text>
    <View style={{
      backgroundColor: "#6355E4",
      padding: 15,
      borderRadius: 95,
    }}>
      <Ionicons name="heart" size={40} color="white"/>
    </View>
  </View>
);


/// STYLES

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: SCREEN_HEIGHT*0.05,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  matchCard: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH*0.9,
    zIndex: 2,
  },
  image: {
    flex: 1,
    borderRadius: 35,
    height: null,
    width: null,
    resizeMode: "cover",
  },
  textPanel: {
    position: "absolute",
    zIndex: 3,
    bottom: 125,
    marginLeft: SCREEN_WIDTH*0.05,
  },
  musicPlayer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 95,
    position: "absolute",
  },
  profilPic: {
    width: 50,
    height: 50,
    borderRadius: 95,
    marginRight: 10,
  },
});
