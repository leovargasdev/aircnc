import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login(){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    async function formSubmit() {
        console.log(email, techs);
        return null;
    }

    return ( 
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>EMAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Suas tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={formSubmit} style={styles.btn}>
                    <Text style={styles.btnTexto}>Logar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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
    btnTexto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});