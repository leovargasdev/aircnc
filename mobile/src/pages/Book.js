import React, { useState } from 'react';
import { View, SafeAreaView, Alert, StyleSheet, AsyncStorage, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    const spot_id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleNavigate(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${spot_id}/booking`, {
            date
        }, {
            headers: { user_id  }
        });

        Alert.alert('Reserva criada com sucesso!!!');
        navigation.navigate('List');
    }
    
    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.contaier}>
            <Text style={styles.label}>Data</Text>
            <TextInput 
                style={styles.input}
                placeholder="qual data você deseja reservar???"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleNavigate} style={styles.btn}>
                <Text style={styles.btnTexto}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.btn, styles.btnCancelar]}>
                <Text style={styles.btnTexto}>Cancelar Reserva</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contaier: {
        margin: 30,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 20,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2

    },
    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    btnCancelar: {
        backgroundColor: '#ccc',
        marginTop: 4,
    },  
    btnTexto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});