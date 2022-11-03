import { StyleSheet, Text, View } from 'react-native';

export default function ChatScreen(){
    return (
        <View style={styles.Appcontainer}>
            <Text>Chat with people who liked you.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });