import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const BodyText = (props) => {
    return (
        <Text style={{...styles.text, ...props.style}}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});

export default BodyText;