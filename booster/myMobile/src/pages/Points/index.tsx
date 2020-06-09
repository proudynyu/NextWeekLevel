import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import { SvgUri } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import * as Location from 'expo-location';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Alert} from 'react-native';


interface DataObj {
    name: string,
    email: string,
    whatsapp: string,
    uf: string,
    city: string,
    itens: number[]
}

interface Itens {
    id: number,
    name: string,
    image_url: string
}

const Points = () => {
    const navigator = useNavigation();
    const [data, setData] = useState<DataObj>({} as DataObj);
    const [itens, setItens] = useState<Itens[]>([])
    const [initialPos, setInitialPos] = useState<[number, number]>([-23.1310627, -46.5672627]);

    useEffect(() => {
        api.get('itens')
            .then( response => {
                setItens(response.data)
            })
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestPermissionsAsync(); 
            if (status !== 'granted') {
                Alert.alert('Ops! Precisamos da sua permissão para obter a localização');
                return
            }
            const local = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = local.coords;
            setInitialPos([latitude, longitude]);
        })();
    }, [])

    function handleBack(){
        navigator.goBack();
    };

    function handleCreatePoint(){

    };

    function handlePress(press: MapEvent){
        const { latitude, longitude } = press.nativeEvent.coordinate;
        setInitialPos([latitude, longitude]);
    }

    return (
        <ScrollView>
            <View style={styles.pointsContainer}>
            <TouchableOpacity onPress={handleBack}>
                <Feather name='arrow-left' size={20} color='#34cb79' />
            </TouchableOpacity>

                <View style={styles.info}>
                    <Text style={styles.title}>
                        Cadastro do ponto de coleta
                    </Text>
                </View>

                <View style={styles.address}>
                    <Text style={styles.addressText}>
                        Dados
                    </Text>
                    <TextInput 
                        placeholder='Nome da Empresa' 
                        value={data.name}
                        onChangeText={text => setData({...data, name: text})}
                        style={styles.input} />
                    <TextInput 
                        placeholder='Email'
                        value={data.email}
                        onChangeText={text => setData({...data, email: text})}
                        style={styles.input} />
                    <TextInput 
                        placeholder='Whatsapp'
                        value={data.whatsapp} 
                        onChangeText={text => setData({...data, whatsapp: text})}
                        style={styles.input} />
                    <TextInput 
                        placeholder='UF' 
                        value={data.uf}
                        onChangeText={text => setData({...data, uf: text})}
                        style={styles.input} />
                    <TextInput 
                        placeholder='Cidade' 
                        value={data.city}
                        onChangeText={text => setData({...data, city: text})}
                        style={styles.input} />
                </View>

                <View style={styles.mapContainer}>
                    <Text style={styles.addressText}>
                        Endereço
                    </Text>
                    <MapView 
                        style={styles.map}
                        initialRegion={{
                            latitude: initialPos[0],
                            longitude: initialPos[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                        onPress={(e) => handlePress(e)}
                    >
                        <Marker 
                            coordinate={{ latitude: initialPos[0], longitude: initialPos[1] }}
                        />
                    </MapView>
                </View>

                <Text style={styles.addressText}>
                    Items para Coleta
                </Text>
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
                                    <TouchableOpacity key={item.id} style={styles.touchButton} onPress={() => {}}>
                                        <SvgUri width={45} height={45} uri={`http://192.168.0.60:3333/${url}`}/>
                                        <Text style={styles.buttonText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )})
                        }
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <RectButton style={styles.btn} onPress={handleCreatePoint} >
                        <View style={styles.buttonIcon}>
                            <Text><Feather name='arrow-right' size={22} color="#FFF"/></Text>
                        </View>
                        <Text style={styles.btnText}>Entrar</Text>
                    </RectButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pointsContainer: {
        flex: 1,
        width: '100%',
        padding: 30,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 30,
        color: '#4c3f8f',
        fontWeight: 'bold',
        marginTop: 10,
    },
    info: {
        flex: 1,
    },
    address: {
        flex: 1,
        marginTop: 20,
    },
    addressText: {
        fontSize: 25,
        color: '#4c3f8f',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 65,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 8,
        fontSize: 18,
        color: '#2b2b2b'
    },
    footer: {
        marginTop: 15,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 15,
    },
    map: {
        width: '100%',
        height: 250,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
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
    buttonText: {
        color: '#2b2b2b',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center'
    },
    btn :{
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

export default Points;