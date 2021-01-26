import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Alert, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NumberContainer from "../components/NumberContainer";
import Card from '../components/Card';
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";


const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guesses, setGuesses] = useState([initialGuess]);


    const lowestNumber = useRef(1);
    const highestNumber = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(guesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert(
                "Don't cheat!",
                "You know what you did... Please send an apology email to imadirtyliar@gmail.com",
                [
                    {text: 'Sorry!', style: 'cancel'}
                ]
            );
            return;
        }
        if (direction === 'lower') {
            highestNumber.current = currentGuess;
        } else if (direction === 'higher') {
            lowestNumber.current = currentGuess + 1;
        }
        const newNumber = generateRandomBetween(lowestNumber.current, highestNumber.current, currentGuess);
        setCurrentGuess(newNumber);
        //setRounds((currentRounds) => currentRounds + 1);
        setGuesses((guesses) => [newNumber, ...guesses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler("lower")}><Ionicons name={"md-remove"} size={24} color={"white"}/></MainButton>
                <MainButton onPress={() => nextGuessHandler("higher")}><Ionicons name={"md-add"} size={24} color={"white"}/></MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {guesses.map((guess, index) => {
                        return (renderListItem(guess, ((guesses.length - index))))
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    list: {
        width: '90%',
        flex: 1
    }
});

const renderListItem = (guess, roundNumber) => {
    return (
        <View key={guess + 'guessNum'} style={styles.listItem}>
            <BodyText>#{roundNumber}</BodyText>
            <BodyText>{guess}</BodyText>
        </View>
    );
};

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max-min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

export default GameScreen;