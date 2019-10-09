import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
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

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
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
    }
});