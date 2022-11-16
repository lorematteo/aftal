import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';

import { width, height, Android} from '../../utils/constants';

import { events as eventsObj } from "./data";

export default function DiscoverScreen(){

    return (
        <SafeAreaView style={[styles.viewContainer, Android.SafeArea]}>
            <View style={{alignItems: "center", justifyContent: "space-between"}}>
                <FlatList
                data={eventsObj}
                ListHeaderComponent={<Text style={styles.title}>Découvrir</Text>}
                renderItem={({ item }) => <EventCard title={item.name} type={item.type}/>}
                numColumns={2}
                keyExtractor={(item) => item.name}
                style={{width: width, padding: 5}}
                />
            </View>
      </SafeAreaView>
    );
}

const EventCard = ({title, type, desc}) => (
    <TouchableOpacity style={{
        height: height*0.3,
        backgroundColor: "lightgray",
        borderRadius: 15,
        padding: 5,
        margin: 5,
        flex: 1
    }}>
        <View style={{flex: 1, justifyContent: "space-between"}}>
            <View></View>
            <Text>{title}</Text>
            <View>
                <Text>{desc}</Text>
                <Text>{type}</Text>
            </View>
        </View>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 35,
        fontWeight: "500",
    }
});