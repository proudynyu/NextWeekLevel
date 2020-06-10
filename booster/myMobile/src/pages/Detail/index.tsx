import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg'
import { Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

interface Itens {
    id: number,
    name: string,
    image_url: string
}

interface Params {
    city: string,
    uf: string
}

interface Points {
    id: number,
    name: string,
    email: string,
    whatsapp: string,
    image: string,
    latitude: number,
    longitude: number,
}

const Detail = () => {
    const navigator = useNavigation();
    const [itens, setItens] = useState<Itens[]>([]);
    const [points, setPoints] = useState<Points[]>([]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        api.get('itens')
            .then( response => {
                setItens(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                itens: String(selectedItens.join(','))
            }
        })
        .then( response => {
            setPoints(response.data);
        });
    }, [selectedItens])

    function handleBack(){
        navigator.goBack();
    };
    function handleCreate(){
        navigator.navigate('Points');
    };
    function handleSelectedItem(id: number){
        const alreadySelect = selectedItens.findIndex( item => item === id);
        if (alreadySelect >= 0) {
            const filteredItens = selectedItens.filter(item => item !== id);
            setSelectedItens(filteredItens);
        } else {
            setSelectedItens([...selectedItens, id]);
        }
    };
    
    return (
        <ScrollView>
            <View style={styles.detailContainer}>
                <TouchableOpacity onPress={handleBack} style={{ opacity: 0.5 }}>
                    <Feather name='arrow-left' size={20} color='#34cb79' />
                </TouchableOpacity>

                <View style={styles.info}>
                    <Text style={styles.title}>
                        Bem-vindo!
                    </Text>
                    <Text style={styles.description}>
                        Encontre um ponto de coleta próximo de você!
                    </Text>
                </View>

                <View style={styles.detailMapContainer}>
                    <MapView 
                        style={styles.detailMap}
                        initialRegion={{
                            latitude: -23.1291185,
                            longitude: -46.5664884,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }} 
                    />
                </View>
                
                <View style={styles.itemContainer}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            itens.map( item => {
                                const splitUrl = item.image_url.split('/');
                                const url = splitUrl.splice(splitUrl.length - 2).join('/')
                                return (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={[
                                        styles.touchButton,
                                        selectedItens.includes(item.id) ? styles.selectedItem : {}
                                    ]} 
                                    onPress={(id) => handleSelectedItem(item.id)}>
                                    <SvgUri width={45} height={45} uri={`http://192.168.0.60:3333/${url}`}/>
                                    <Text style={styles.buttonText}>{item.name}</Text>
                                </TouchableOpacity>
                            )})
                        }
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleCreate} >
                        <View style={styles.buttonIcon}>
                            <Text><Feather name='arrow-right' size={22} color="#FFF"/></Text>
                        </View>
                        <Text style={styles.btnText}>Create new Point</Text>
                    </RectButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        marginTop: 10,
    },
    info: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: '#4c3f8f',
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        color: '#b8b8b8',
        fontSize: 16,
        lineHeight: 22,
        maxWidth: 260,
        marginTop: 25,
    },
    detailMapContainer: {
        height: 300,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 5,
    },
    detailMap: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    touchButton: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginLeft: 6,
        padding: 5,
    },
    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },
    buttonText: {
        color: '#2b2b2b',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },
    footer: {       
    },
    button :{
        backgroundColor: '#34CB79',
        marginTop: 15,
        height: 60,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    btnText: {
        color: 'white',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonIcon: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000033',
    }
});

export default Detail;