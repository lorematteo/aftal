import { Dimensions, StyleSheet, Platform, StatusBar } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const CARDSIZE = {
    WIDTH: width*0.9,
    HEIGHT: height>700 ? height * 0.65 : height * 0.69,
    OUTWIDTH: width * 1.5,
    BORDERRADIUS: 50,
    BUTTONSHAPEWIDTH: (height * 0.1) * 1.345,
    BUTTONSHAPEHEIGHT : height * 0.1,
  };
  
export const ACTION_OFFSET = 100;


export const Android = StyleSheet.create({
  SafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export const COLORS = {
  primary: "#5994EB",
};