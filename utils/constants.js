import { Dimensions, StyleSheet, Platform, StatusBar } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const CARDSIZE = {
    WIDTH: height*0.7/1.5232013479,
    HEIGHT: height * 0.7,
    OUTWIDTH: width * 1.5,
    BORDERRADIUS: 30,
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