import { StyleSheet, Text, View, Animated, Image, PanResponder, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useCallback, useEffect, useLayoutEffect} from "react";
import useState from 'react-usestateref'
import Svg, { Path } from 'react-native-svg';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { width, height, CARDSIZE, ACTION_OFFSET, COLORS, generateMatchId } from '../../../utils/constants';

import Card from '../components/cardComponent';


export default function MatchScreen({ navigation }) {

  const user = firebase.auth().currentUser;

  return (
    <SafeAreaView style={[styles.viewContent]}>
      <TopBar nav={navigation} user={user}/>
      <MatchContainer nav={navigation} user={user}/>
    </SafeAreaView>
  );
}


/// TOP BAR
function TopBar({nav, user}){
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: width*0.04,
      paddingTop: 10,
    }}>
      <TouchableOpacity onPress={() => nav.navigate("Profil")}>
        <Image style={styles.profilPic} source={{uri: user.photoURL}}/>
      </TouchableOpacity>
      
      <Text style={{fontSize: width>380 ? 20 : 18}}>Hi, </Text>
      <Text style={{fontSize: width>380 ? 20 : 18, fontWeight: "bold"}}>{user.displayName}</Text>
      
      
  
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
function MatchContainer({nav, user}){

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [profiles, setProfiles, profilesref] = useState([]);


  // Checking user existence in firestore db
  useEffect(() => {
    const unsub = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
            if (!documentSnapshot.exists){
                nav.navigate("CardSetup");
            }
    });

    console.log("checking user existence");
    return unsub;
  }, []);


  // Fetching cards
  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await firestore().collection("users").doc(user.uid).collection("passes").get().then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );
      const likes = await firestore().collection("users").doc(user.uid).collection("likes").get().then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );

      const passedUserIds = passes.length > 0 ? passes : ["empty"];
      const likedUserIds = likes.length > 0 ? likes : ["empty"];

      console.log([...passedUserIds, ...likedUserIds]);

      unsub = firestore()
      .collection('users')
      .where("id", "not-in", [...passedUserIds, ...likedUserIds])
      .onSnapshot(snapshot => {
        setProfiles(
            snapshot.docs.filter(doc => doc.id != user.uid).map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        )
      });
    }

    fetchCards();
    return unsub;
  }, []);

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
            handleSwipe(tiltSign, direction, dy);
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
    }), user
  ).current;

  const handleSwipe = useCallback((tiltSign, direction, dy) => {
    let userSwiped = profilesref.current[0];
    let sign = Number.parseInt(JSON.stringify(tiltSign));
    if(sign==1){
      handleLike(userSwiped);
    } else {
      handleNo(userSwiped);
    }
    Animated.timing(swipe, {
      duration: 200,
      toValue: {
        x: direction * CARDSIZE.OUTWIDTH,
        y: dy,
      },
      useNativeDriver: true,
    }).start(transitionNext);
  }, [swipe, transitionNext]
  );
  
  const transitionNext = useCallback(() => {
    setProfiles((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);
  
  const handleLike = async (userSwiped) => {
    if(!userSwiped) return;

    console.log("like on "+userSwiped.name);

    const loggedInProfile = await firestore().collection("users").doc(user.uid).get().then((snapshot) => snapshot.data());

    //Check if the user has swiped on you
    firestore().collection("users").doc(userSwiped.id).collection("likes").doc(user.uid).get().then( (docSnap) => {
      if(docSnap.exists){
        // userSwiped has already like the actual user -> CREATE A MATCH
        console.log("yeahh, you matched!")

        firestore()
        .collection("users")
        .doc(user.uid)
        .collection("likes")
        .doc(userSwiped.id)
        .set({
          userSwiped
        })

        firestore()
        .collection("matches")
        .doc(generateMatchId(user.uid, userSwiped.id))
        .set({
          users: {[user.uid] : loggedInProfile, [userSwiped.id] : userSwiped},
          usersMatched: [user.uid, userSwiped.id],
          timestamp: firestore.FieldValue.serverTimestamp(),
        })

        nav.navigate("Matching", { loggedInProfile, userSwiped} )
      } else {
        // create first likes between boths
        firestore()
        .collection("users")
        .doc(user.uid)
        .collection("likes")
        .doc(userSwiped.id)
        .set({
          userSwiped
        })
      }
    })

    
  }

  const handleNo = (userSwiped) => {
    if(!userSwiped) return;

    console.log("passed on "+userSwiped.name);

    firestore()
      .collection("users")
      .doc(user.uid)
      .collection("passes")
      .doc(userSwiped.uid)
      .set({
        userSwiped
      })
  }

  const handleChoice = useCallback((sign, userSwiped) => {
    if(sign==1){
      handleLike(userSwiped);
    } else {
      handleNo(userSwiped);
    }
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
        .map(({ id, name, profilpic, picture1 }, index) => {
          const isFirst = index === 0;
          const panHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={id}
              name={name}
              source={picture1}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...panHandlers}
            />
          );
        })
        .reverse()
      }
      
      <View style={{position: "absolute", marginTop: CARDSIZE.HEIGHT*0.4, alignItems: "center", justifyContent: "center", zIndex: -1}}>
        <Text style={{color: COLORS.gray, fontSize: 18}}>No more profiles in your area.</Text>
        <Ionicons name="sad-outline" size={55} color={COLORS.gray} style={{padding: 10}}/>
      </View>
      <View style={styles.buttonsBox}>
        <MusicPlayer handleSong={() => alert("play music")}/>

        <ButtonBar
          handleLike={() => handleChoice(1, profiles[0])}
          handleNo={() => handleChoice(-1, profiles[0])}
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
          borderRadius: 95,
          width: width*0.15,
          height: width*0.15,
          alignItems: "center",
          justifyContent: "center",
        }}>
            <Ionicons name="close" size={40} color="white"/>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: height*0.04}}>{emoji}</Text>
      <TouchableOpacity onPress={handleLike}>
        <View style={{
          backgroundColor: COLORS.green,
          borderRadius: 95,
          width: width*0.15,
          height: width*0.15,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Ionicons name="musical-note" size={38} color="white"/>
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
    paddingTop: CARDSIZE.HEIGHT*0.02,
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