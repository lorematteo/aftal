import React from "react";
import { Animated, Text, StyleSheet, Image } from "react-native";

import { width, height, CARDSIZE, ACTION_OFFSET } from "../../../utils/constants";

export default function Card({
  name,
  source,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
  };

  return (
    <Animated.View style={[styles.cardContainer, isFirst && animatedCardStyle]} {...rest}>

      <Image source={{uri: source}} style={styles.image} />
      
      <Text style={styles.cardName}>{name}</Text>

      {isFirst && (
        <>
          <Choice type="like" style={{ 
            opacity: likeOpacity,
            top: height*0.12,
            left: width * 0.1,
            transform: [{rotate: "-30deg"}],
            }}
          />
          <Choice type="nope" style={{ 
            opacity: nopeOpacity,
            top: height*0.12,
            right: width*0.1,
            transform: [{rotate: "30deg"}],
            }}
          />
        </>
      )}
    </Animated.View>
  );
}

function Choice({ type, style }) {
    const color = (type == "like") ? "green" : "red";
  
    return (
      <Animated.View type={type} style={[style, styles.choiceContainer, {borderColor: color}]}>
        <Text type={type} style={[styles.choiceText, {color: color}]}>{type} </Text>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    alignItems: "center",
  },
  cardName: {
    position: "absolute",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: {width: 1,height: 5},
    textShadowRadius: 0,
    letterSpacing: 0.5,
    bottom: CARDSIZE.HEIGHT*0.2,
    left: 20,
  },
  image: {
    width: CARDSIZE.WIDTH,
    height: CARDSIZE.HEIGHT,
    borderRadius: CARDSIZE.BORDERRADIUS,
  },
  choiceContainer: {
    position: "absolute",
    borderWidth: 6,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    background: "rgba(0, 0, 0, 0.2)",
  },
  choiceText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
    textTransformation: "uppercase",
    letterSpacing: 5,
  }
})