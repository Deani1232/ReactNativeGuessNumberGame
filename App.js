import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [numberOfRounds, setNumberOfRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error)}/>
    }

    const startGameHandler = (number) => {
        setUserNumber(number);
        setNumberOfRounds(0);
    };

    const configureNewGameHandler = () => {
        setNumberOfRounds(0);
        setUserNumber(null);
    };

    const gameOverHandler = (numberOfRounds) => {
        setNumberOfRounds(numberOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler}/>;
    //let content = <GameOverScreen numberOfRounds={1} userNumber={2} onNewGame={configureNewGameHandler}/>;

    if (userNumber && numberOfRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
    } else if (numberOfRounds > 0) {
        content = <GameOverScreen numberOfRounds={numberOfRounds} userNumber={userNumber} onNewGame={configureNewGameHandler}/>
    }

    return (
        <View style={styles.screen}>
            <Header title={"Guess a Number"}/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
