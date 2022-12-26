import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const CARDSIZE = {
    WIDTH: width*0.95,
    HEIGHT: height>700 ? height * 0.67 : height * 0.69,
    OUTWIDTH: width * 1.5,
    BORDERRADIUS: 50,
    BUTTONSHAPEWIDTH: (height * 0.1) * 1.345,
    BUTTONSHAPEHEIGHT : height * 0.1,
  };
  
export const ACTION_OFFSET = 100;

export const COLORS = {
  primary: "#5994EB",
  green: "#59B85D",
  gray: "#8A8993",
};

export const generateMatchId = (id1, id2) => { id1 < id2 ? id1+id2 : id2+id1};