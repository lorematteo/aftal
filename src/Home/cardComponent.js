import React from 'react';
import { Animated } from 'react-native';

import { ACTION_OFFSET } from '../../utils/constants';
import { LinearGradient } from 'expo-linear-gradient';

import { width, height, CARD, VERTICAL_MARGIN } from '../../utils/constants';

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
    <Animated.View
      style={
        [
            isFirst && animatedCardStyle,
            {
                position: "absolute",
                //opacity: cardOpacity,
            }
        ]}
      {...rest}
    >
      <MatchCardShape image={item.uri}/>
      <Gradient />
      <Name>{name}</Name>
      {isFirst && (
        <>
          <Like type="like" style={{ opacity: likeOpacity }} />
          <Nope type="nope" style={{ opacity: nopeOpacity }} />
        </>
      )}
    </Animated.View>
  );
}


const Name = styled.Text`
  position: absolute;
  font-size: 35px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.5px;
  bottom: 25px;
  left: 20px;
`;

const Gradient = styled(LinearGradient).attrs({
  colors: ['transparent', 'rgba(0, 0, 0, 0.9)'],
})`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 150px;
  border-radius: ${CARD.CARD_BORDER_RADIUS}px;
`;

function Choice({ type }) {
    const color = COLORS[type];
  
    return (
      <View style={[styles.container, { borderColor: color }]}>
        <Text style={[styles.text, { color }]}>{type}</Text>
      </View>
    );
}

const Like = styled(Choice)`
  top: ${height * 0.12}px;
  left: ${width * 0.1}px;
  transform: rotate(-30deg);
`;

const Nope = styled(Choice)`
  top: ${height * 0.12}px;
  right: ${width * 0.1}px;
  transform: rotate(30deg);
`;