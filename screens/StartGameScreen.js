import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';

import Colors from '../constants/Colors';
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);

    const numberInputHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >=100) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99.',
                [
                    {text: 'Close', style:'destructive', onPress: resetInputHandler}
                ]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput = null;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start A New Game</Text>
                <Card style={styles.selectANumberContainer}>
                    <Text>Select A Number</Text>
                    <Input
                        style={styles.inputComponent}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title={"Reset"} onPress={() => resetInputHandler()} color={Colors.accent}/></View>
                        <View style={styles.button}><Button title={"Confirm"} onPress={() => confirmInputHandler()} color={Colors.primary}/></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    selectANumberContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '45%'
    },
    inputComponent: {
        width: 70,
        textAlign: 'center'
    },
    summaryContainer: {
        marginVertical: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;