import { StyleSheet, Text, View, Animated, Image, PanResponder, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useCallback, useEffect} from "react";

import { width, height, CARDSIZE, ACTION_OFFSET, Android} from '../../../utils/constants';

import Card from '../components/cardComponent';

import { profiles as profilesObj } from '../data';


export default function MatchScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.viewContainer, Android.SafeArea]}>
      <View style={styles.viewContent}>
        <TopBar nav={navigation} />
        <MatchContainer/>
        <View></View>
      </View>
    </SafeAreaView>
  );
}


/// TOP BAR
function TopBar({nav}){
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: width*0.04,
      paddingTop: 10,
    }}>
      <Image style={styles.profilPic} source={require("../../../assets/2.jpeg")}/>
      <Text style={{fontSize: width>380 ? 20 : 18}}>Hi, </Text>
      <Text style={{fontSize: width>380 ? 20 : 18, fontWeight: "bold"}}>Mattéo</Text>
  
      <View style={{flex:1}}></View>
  
      <TouchableOpacity onPress={() => nav.navigate("Filter")}>
        <Ionicons name="location" size={width>380 ? 25 : 23}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate("Notif")}>
        <Ionicons style={{marginLeft: 10}} name="notifications" size={width>380 ? 25 : 23}/>
      </TouchableOpacity>
      
    </View>
  )
};



/// SWIPEABLE CARDS
function MatchContainer(){

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [profiles, setProfiles] = useState(profilesObj);

  useEffect(() => {
    if (profiles.length === 0) {
      setProfiles(profilesObj);
    }
  }, [profiles]);

  const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (e, { dx, dy, y0 }) => {
          // 1: sens horaire | -1: sens anti-horaire
          tiltSign.setValue(y0 > CARDSIZE.HEIGHT / 2 ? 1 : -1);
          swipe.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (e, { dx, dy }) => {
          const direction = Math.sign(dx);
          const userAction = Math.abs(dx) > ACTION_OFFSET;

          if (userAction) {
            Animated.timing(swipe, {
              duration: 200,
              toValue: {
                x: direction * CARDSIZE.OUTWIDTH,
                y: dy,
              },
              useNativeDriver: true,
            }).start(transitionNext);
          } else {
            Animated.spring(swipe, {
              friction: 5,
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
          }
        },
    })
  ).current;

  const transitionNext = useCallback(() => {
      setProfiles((prevState) => prevState.slice(1));
      swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);
  
  const handleChoice = useCallback(
    (sign) => {
      Animated.timing(swipe.x, {
        duration: 400,
        toValue: sign * CARDSIZE.OUTWIDTH,
        useNativeDriver: true,
      }).start(transitionNext);
    },
    [swipe.x, transitionNext]
  );

  return (
    <View style={styles.matchCard}>
      {profiles
        .map(({ name, source }, index) => {
          const isFirst = index === 0;
          const panHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={name}
              name={name}
              source={source}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...panHandlers}
            />
          );
        })
        .reverse()
      }

      <MusicPlayer handleSong={() => alert("play music")}/>

      <ButtonBar
        handleLike={() => handleChoice(1)}
        handleNo={() => handleChoice(-1)}
        emoji={(profiles.length === 0 ) ? "" : profiles[0].emoji}
      />

    </View>
  );
}


/// MUSIC PLAYER
function MusicPlayer({handleSong}) {
  return (
    <TouchableOpacity onPress={handleSong} style={styles.musicPlayer}>
        <View style={{
          padding: 4,
          borderColor: "black",
          borderWidth: 3,
          borderRadius: 95,
        }}>
          <View style={{
            backgroundColor: "black",
            padding: height*0.01,
            borderRadius: 95,
          }}>
            <Ionicons name="pause-outline" size={height*0.05} color={"white"}/>
          </View>
        </View>
    </TouchableOpacity>
  )
};


/// BUTTON BAR
function ButtonBar({ handleLike, handleNo, emoji }) {
  return (
    <View style={styles.buttonBar}>
      <TouchableOpacity onPress={handleNo}>
        <View style={{
          backgroundColor: "#FB7B72",
          padding: height*0.01,
          borderRadius: 95,
        }}>
            <Ionicons name="close" size={height*0.05} color="white"/>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: height*0.04}}>{emoji}</Text>
      <TouchableOpacity onPress={handleLike}>
        <View style={{
          backgroundColor: "#6355EA",
          padding: height*0.01,
          borderRadius: 95,
        }}>
          <Ionicons name="musical-note" size={height*0.05} color="white"/>
        </View>
      </TouchableOpacity>
    </View>
  )
};


/// STYLES
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  viewContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: height*0.08,
  },
  topBar: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  matchCard: {
    padding: 10,
    height: CARDSIZE.HEIGHT,
    width: CARDSIZE.WIDTH,
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
    bottom: -height*0.08,
    flexDirection: "row",
    alignItems: "center",
    width: width*0.9,
    justifyContent: "space-around",
  },
  profilPic: {
    width: width*0.1,
    height: width*0.1,
    borderRadius: 95,
    marginRight: 10,
  },
});