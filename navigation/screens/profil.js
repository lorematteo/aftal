import { StyleSheet, Text, View } from 'react-native';

export default function ProfilScreen(){
    return (
        <View style={styles.Appcontainer}>
            <Text>Update your profil.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });