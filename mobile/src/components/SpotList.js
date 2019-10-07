import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function SpotList({ tech }){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function LoadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            });
            console.log(response.data);
            setSpots(response.data);
        }
        LoadSpots();
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Empresas que usam a tecnologia <Text style={styles.bold}>{tech}</Text>
            </Text>

            <FlatList 
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.imagemItem} source={{ uri: item.img_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : "EH GRATIS"}</Text>
                        <TouchableOpacity onPress={() => {}} style={styles.btn}>
                            <Text style={styles.btnTexto}>Reservar Sala</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15 
    },
    bold:{
        fontWeight: 'bold'
    },
    list:{
        paddingTop: 20
    }, 
    listItem:{
        marginRight: 15,
    },
    imagemItem: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price:{
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    btnTexto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
})