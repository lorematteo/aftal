import { StyleSheet, Text, View, Animated, Image, PanResponder, Dimensions, SafeAreaView, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

import MatchCardShape from "./matchCardShape";

const profiles = [
  { id: "1", uri: require("../../assets/1.jpeg") },
  { id: "2", uri: require("../../assets/2.jpeg") },
  { id: "3", uri: require("../../assets/3.jpeg") },
].reverse();

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={[styles.viewContent, {zIndex: 1}]}>
        <TopBar />
        <View style={{zIndex: 1}}>
          <MatchCards/>
        </View>
      </View>
    </SafeAreaView>
  );
}



/// TOP BAR
const TopBar = (props) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SCREEN_WIDTH*0.04,
    paddingTop: 10,
  }}>
    <Image style={styles.profilPic} source={require("../../assets/2.jpeg")}/>
    <Text style={{fontSize: SCREEN_WIDTH>380 ? 20 : 18}}>Hi, </Text>
    <Text style={{fontSize: SCREEN_WIDTH>380 ? 20 : 18, fontWeight: "bold"}}>Mattéo</Text>

    <View style={{flex:1}}></View>

    <Ionicons name="location" size={SCREEN_WIDTH>380 ? 25 : 23}/>
    <Ionicons style={{marginLeft: 10}} name="notifications" size={SCREEN_WIDTH>380 ? 25 : 23}/>
  </View>
);



/// SWIPEABLE CARDS
const SwipeableCard = ({ item, removeCard, swipedDirection }) => {

  const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  let swipeDirection = "";

  // Card dragging animation
  let cardOpacity = new Animated.Value(1);
  let rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  let rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = 'Right';
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = 'Left';
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      // RIGHT
      if (gestureState.dx > 120) {
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy + 50 },
            useNativeDriver: true,
            duration: 250,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      // LEFT
      } else if (gestureState.dx < -120) {
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy + 50 },
            useNativeDriver: true,
            duration: 250,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      // MIDDLE
      } else {
        swipedDirection('--');
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Animated.View
        {...panResponder.panHandlers}
        style={[
          rotateAndTranslate,
          styles.matchCard,
          {
            position: "absolute",
            opacity: cardOpacity,
          }
        ]}>
        <MatchCardShape image={item.uri}/>
    </Animated.View>
  )
};

const MatchCards = (props) => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [deck, setDeck] = useState(profiles);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = (id) => {
    //alert(id);
    deck.splice(
      deck.findIndex((item) => item.id == id), 
      1
    );
    setDeck(deck);
    if (deck.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <View style={styles.matchCard}>
      {deck.map((card, key) => (
        <SwipeableCard
        key={key}
        item={card}
        removeCard={() => removeCard(card.id)}
        swipedDirection={lastSwipedDirection}
        />
      ))}
      {noMoreCard ? (
        <Text style={{ fontSize: 22, color: '#000' }}>No Cards Found.</Text>
      ) : null}
      <MusicPlayer/>
      <ButtonBar removeCardCMD={() => removeCard(card.id)} swipedDirectionCMD={lastSwipedDirection}/>
    </View>
  );
}

//

/// MUSIC PLAYER
const MusicPlayer = (props) => (
    <View style={styles.musicPlayer}>
      <View style={{
        padding: 4,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 95,
      }}>
        <View style={{
        backgroundColor: "black",
        padding: SCREEN_HEIGHT*0.01,
        borderRadius: 95,
        }}>
          <Ionicons name="pause-outline" size={SCREEN_HEIGHT*0.05} color={"white"}/>
        </View>
      </View>
    </View>
);



/// BUTTON BAR
const ButtonBar = (removeCardCMD, swipedDirectionCMD) => (
  <View style={styles.buttonBar}>
    <TouchableHighlight onPress={()=>{removeCardCMD, swipedDirectionCMD}}>
      <View style={{
        backgroundColor: "#FB7B72",
        padding: SCREEN_HEIGHT*0.01,
        borderRadius: 95,
      }}>
          <Ionicons name="close" size={SCREEN_HEIGHT*0.05} color="white"/>
      </View>
    </TouchableHighlight>
    <Text style={{fontSize: SCREEN_HEIGHT*0.04}}>👋</Text>
    <View style={{
      backgroundColor: "#6355EA",
      padding: SCREEN_HEIGHT*0.01,
      borderRadius: 95,
    }}>
      <Ionicons name="musical-note" size={SCREEN_HEIGHT*0.05} color="white"/>
    </View>
  </View>
);



/// STYLES
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  viewContent: {
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  matchCard: {
    padding: 10,
    height: SCREEN_HEIGHT * 0.7,
    width: SCREEN_HEIGHT*0.7/1.5232013479,
    zIndex: 1,
    alignItems: "center",
  },
  musicPlayer: {
    backgroundColor: "white",
    borderRadius: 95,
    position: "absolute",
    bottom: 0,
  },
  buttonBar: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT*0.07,
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH*0.9,
    justifyContent: "space-around",
  },
  profilPic: {
    width: SCREEN_WIDTH*0.1,
    height: SCREEN_WIDTH*0.1,
    borderRadius: 95,
    marginRight: 10,
  },
});
