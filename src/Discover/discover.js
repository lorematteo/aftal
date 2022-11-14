import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function DiscoverScreen(){
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Découvrir</Text>
                <View>
                    <Text>Item 1</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: "lightgrey",
      padding: 30,
    },
  });