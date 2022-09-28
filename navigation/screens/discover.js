import { StyleSheet, Text, View } from 'react-native';

export default function DiscoverScreen(){
    return (
        <View style={styles.Appcontainer}>
            <Text>Discover new activities.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });