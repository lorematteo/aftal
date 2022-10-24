import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const profiles = [
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
  { id: "4", uri: require("../../assets/4.jpeg") },
  { id: "5", uri: require("../../assets/5.jpeg") },
];

export default function HomeScreen() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.topBar}>
        <Ionicons name="person-circle" size={25} />
        <Text>Aftal</Text>
        <Ionicons name="notifications" size={25} />
      </View>
      <SwipeCards />
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {profiles
            .map((item, i) => {
              if (i < this.state.currentIndex) {
                return null;
              } else if (i == this.state.currentIndex) {
                return (
                  <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={i}
                    style={[this.rotateAndTranslate, , styles.matchCard]}
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
                    <TextPanel />
                    <ButtonBar />
                    <Image
                      style={styles.image}
                      source={item.uri}
                      defaultSource={item.uri}
                    />
                  </Animated.View>
                );
              } else {
                return (
                  <Animated.View
                    key={i}
                    style={[
                      styles.nextMatchCard,
                      {
                        opacity: this.nextCardOpacity,
                        transform: [{ scale: this.nextCardScale }],
                      },
                    ]}
                  >
                    <ButtonBar />
                    <TextPanel />
                    <Image style={styles.image} source={item.uri} />
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

const ButtonBar = (props) => (
  <View style={styles.buttonBar}>
    <CircleButton size={75} icon={"close"} color={"red"} margin={10} />
    <View style={{ justifyContent: "center" }}>
      <CircleButton
        size={50}
        icon={"musical-notes"}
        color={"blue"}
        margin={5}
      />
    </View>
    <View style={{ justifyContent: "center" }}>
      <CircleButton
        size={50}
        icon={"share-social"}
        color={"purple"}
        margin={5}
      />
    </View>
    <CircleButton size={75} icon={"checkmark"} color={"green"} margin={10} />
  </View>
);

const CircleButton = (props) => (
  <TouchableOpacity
    style={{
      height: props.size,
      width: props.size,
      margin: props.margin,
      alignItems: "center",
      justifyContent: "center",
      borderColor: props.color,
      borderRadius: props.size * 2,
      borderWidth: 1,
    }}
    onPress={props.onPress}
  >
    <Ionicons name={props.icon} size={props.size / 1.5} color={props.color} style={{fontStyle: "bold"}}/>
  </TouchableOpacity>
);

const TextPanel = (props) => (
  <View style={styles.textPanel}>
    <Text style={{fontSize: 25, color: "white"}}>Prénom, 21</Text>
    <View style={{width: SCREEN_WIDTH, flexDirection: "row",}}>
      <Text style={styles.tagContainer}>Guitare</Text>
      <Text style={styles.tagContainer}>Basse</Text>
      <Text style={styles.tagContainer}>Violon</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "white",
    paddingTop: SCREEN_HEIGHT * 0.05,
    flex: 1,
  },
  topBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    height: SCREEN_HEIGHT * 0.06,
  },
  matchContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  matchCard: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.8,
    width: SCREEN_WIDTH,
    position: "absolute",
    padding: 10,
  },
  nextMatchCard: {
    height: SCREEN_HEIGHT * 0.8,
    width: SCREEN_WIDTH,
    position: "absolute",
    padding: 10,
  },
  image: {
    flex: 1,
    borderRadius: 15,
    height: null,
    width: null,
    resizeMode: "cover",
  },
  buttonBar: {
    position: "absolute",
    zIndex: 1000,
    bottom: 20,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  textPanel: {
    position: "absolute",
    zIndex: 1000,
    bottom: 125,
    width: SCREEN_WIDTH,
    padding: 10,
    paddingLeft: SCREEN_HEIGHT*0.05,
  },
  tagContainer: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 15,
    color: "white",
    marginHorizontal: 2,
    overflow: "hidden",
  }
});
