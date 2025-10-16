
import React from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ColorTheme } from '../../constants/GlobalStyles';

const spawnToast = () => {
    ToastAndroid.show("Say Cheese!", ToastAndroid.SHORT)
}

const ExerciseScreen = ({ name }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Exercise Screen {name}</Text>
            <Text>This is where you can manage exercises or routines.</Text>
            <TouchableOpacity onPress={spawnToast} style={{ padding: 10 }}>
                <Ionicons name='camera' size={50} color={ColorTheme.fourth} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ExerciseScreen;
