import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../utils/constants';

export default function SignScreen(){

    return (
        <View style={styles.Appcontainer}>
            <Text>Se connecter</Text>
            <TouchableOpacity>
                <Text>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Appcontainer: {
        flex: 1, 
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        padding: 30,
    },
  });