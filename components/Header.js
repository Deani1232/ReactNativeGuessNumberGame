import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import Colors from '../constants/Colors';

const Header = (props) => {
    return (
        <SafeAreaView style={styles.headerTop}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: (StatusBar.currentHeight + 10),
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 10
    },
    headerTop: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;