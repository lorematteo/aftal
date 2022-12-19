import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function ChatScreen(){
    return (
        <SafeAreaView style={styles.Appcontainer}>
            <Text>Chat with people who liked you.</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });