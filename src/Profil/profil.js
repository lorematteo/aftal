import { StyleSheet, Text, View } from 'react-native';

export default function PremiumScreen(){
    return (
        <View style={styles.Appcontainer}>
            <Text>Update your premium.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });