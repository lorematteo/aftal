import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen(){
    return (
        <View style={styles.Appcontainer}>
      <Text>Match with new people.</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });