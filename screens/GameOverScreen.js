import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from '../components/MainButton';

import Colors from '../constants/Colors.js'


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>GAME OVER!!!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                    //source={{uri: 'https://uiaa-web.azureedge.net/wp-content/uploads/2017/11/RTM19-banner-web.jpg'}}
                    resizeMode={"cover"}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds to guess the
                    number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary
    },
    resultContainer: {
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;