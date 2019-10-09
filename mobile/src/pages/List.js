import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, TouchableOpacity, Text } from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }){
    const [techs, setTechs] = useState([]);
    // Fica ouvindo caso apareça alguma reserva algum dos spots do usuário
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.16:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserna na empresa ${booking.spot.company} foi: ${booking.approved ? 'ACEITA' : 'REJEITADA'}`)
            });
        });
    }, []);
    // Configurando o array de tecnologias
    useEffect(()=>{
        AsyncStorage.getItem('techs').then(tech => {
            const techsArray = tech.split(',').map(t => t.trim());
            setTechs(techsArray);
        });
    }, []);

    async function handleLogout(){
        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('techs', '');

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
                <Text style={styles.btnTexto}>Encerrar Sessão</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
    btnLogout: {
        justifyContent: 'space-between',
        backgroundColor: '#904e4e',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    btnTexto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
});