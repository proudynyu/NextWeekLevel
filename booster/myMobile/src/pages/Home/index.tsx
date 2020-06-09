import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground,
    Image,
    TextInput
    } from 'react-native';

const Home = () => {
    const navigator = useNavigation();

    function handleSearch() {
        navigator.navigate('Detail')
    };

    return (
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.homeContainer}
            imageStyle={{ width: 274, height: 368}}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={styles.title}>
                    Seu Marketplace de resíduos
                </Text>
                <Text style={styles.description}>
                    Ajudamos pessoas a econtrarem pontos de coleta de forma eficiente
                </Text>
            </View>

            <View style={styles.footer}>
                <TextInput placeholder='Insira seu estado' style={styles.input} />
                <TextInput placeholder='Insira sua cidade' style={styles.input} />
                <RectButton style={styles.button} onPress={handleSearch} >
                    <View style={styles.buttonIcon}>
                        <Text><Feather name='arrow-right' size={22} color="#FFF"/></Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        padding: 32,
        backgroundColor: '#f5f5f5',
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#4c3f8f',
        marginTop: 65,
        fontSize: 35,
        maxWidth: 280,
        fontWeight: 'bold'
    },
    description: {
        color: '#b8b8b8',
        fontSize: 16,
        lineHeight: 22,
        maxWidth: 260,
        marginTop: 25,
    },
    footer: {

    },
    input: {
        backgroundColor: 'white',
        borderRadius: 6.5,
        marginTop: 15,
        height: 60,
        padding: 10,
        
    },
    button :{
        backgroundColor: '#34CB79',
        marginTop: 15,
        height: 60,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    buttonText: {
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
})

export default Home;