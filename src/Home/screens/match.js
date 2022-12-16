import { StyleSheet, Text, View, Animated, Image, PanResponder, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useCallback, useEffect} from "react";
import Svg, { Path } from 'react-native-svg';

import { width, height, CARDSIZE, ACTION_OFFSET, Android} from '../../../utils/constants';

import Card from '../components/cardComponent';

import { profiles as profilesObj } from '../data';


export default function MatchScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.viewContent, Android.SafeArea]}>
      <TopBar nav={navigation} />
      <MatchContainer/>
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
      <TouchableOpacity onPress={() => nav.navigate("Profil")}>
        <Image style={styles.profilPic} source={require("../../../assets/2.jpeg")}/>
      </TouchableOpacity>
      
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

      <View style={styles.buttonsBox}>
        <MusicPlayer handleSong={() => alert("play music")}/>

        <ButtonBar
          handleLike={() => handleChoice(1)}
          handleNo={() => handleChoice(-1)}
          emoji={(profiles.length === 0 ) ? "" : profiles[0].emoji}
        />
      </View>

    </View>
  );
}

/// MUSIC PLAYER
function MusicPlayer({handleSong}) {

  const ButtonShape = (props) => (
    <Svg width="100%" height="100%" viewBox="0 0 241.5 179.5" fill="white">
      <Path
        d="M242 116.951S212 119.5 212 90c0 0 2-42-32-68.5 0 0-20.727-21.22-58.75-21.497C83.227.279 62.5 21.5 62.5 21.5 28.5 48 30.5 90 30.5 90c0 29.5-30 26.951-30 26.951S34.5 123 53.671 149c0 0 19.625 30.185 67.579 30.498 47.955-.313 67.579-30.498 67.579-30.498C208 123 242 116.951 242 116.951Z"
        fill="#fff"
      />
    </Svg>
  )

  return (
    <View style={styles.musicPlayer}>
      <ButtonShape/>
      <TouchableOpacity onPress={handleSong} style={{position: "absolute"}}>
        <View style={{
          padding: height>700 ? 4 : 3,
          borderColor: "black",
          borderWidth: height>700 ? 3 : 2,
          borderRadius: 95,
        }}>
          <View style={{
            backgroundColor: "black",
            borderRadius: 95,
            padding: CARDSIZE.BUTTONSHAPEHEIGHT*0.1,
          }}>
            <Ionicons name="pause-outline" size={CARDSIZE.BUTTONSHAPEHEIGHT*0.4} color={"white"}/>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    
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
  viewContent: {
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
    flex: 1,
    marginTop: 15,
    zIndex: 1,
    alignItems: "center",
  },
  buttonsBox: {
    backgroundColor: "white",
    width: width,
    flex: 1,
    top: CARDSIZE.HEIGHT,
    alignItems: "center",
  },
  musicPlayer: {
    position: "absolute",
    width: CARDSIZE.BUTTONSHAPEWIDTH,
    height: CARDSIZE.BUTTONSHAPEHEIGHT,
    top: height>700 ? -CARDSIZE.HEIGHT*0.1 : -CARDSIZE.HEIGHT*0.092,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  buttonBar: {
    width: width,
    paddingTop: CARDSIZE.HEIGHT*0.05,
    flexDirection: "row",
    paddingHorizontal: width*0.07,
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
  },
  profilPic: {
    width: width*0.1,
    height: width*0.1,
    borderRadius: 95,
    marginRight: 10,
  },
});