import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import expoMail from 'expo-mail-composer';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Image,
  Linking } from 'react-native';

interface RouteParams {
  point_id: number,
};

interface DataObj {
  point: {
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
  },
  items: {
    title: string,
  }[];
};

const Detail = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [data, setData] = useState<DataObj>({} as DataObj)

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`)
      .then( resp => {
        setData(resp.data);
      })
  })

  function handleNavigateBack(){
    navigator.goBack();
  };

  function handleComposeMail(){
    expoMail.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    })
  };

  function handleWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta`);
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather size={24} name="arrow-left" color="#3acb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: 'http://192.168.0.60:3333/uploads/lampadas.svg'}}/>
        <Text style={styles.pointName}>Mercadao do Joao</Text>
        <Text style={styles.pointItems}>
          {data.items.map( item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        
        <RectButton style={styles.button} onPress={handleComposeMail}>
          <FontAwesome name="email" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>

      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;