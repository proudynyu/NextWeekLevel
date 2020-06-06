import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as Location from 'expo-location';
import { 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Alert } from 'react-native';

interface Item {
  id: number,
  name: string,
  image_url: string,
};

interface Points {
  id: number,
  image: string,
  name: string,
  latitude: number,
  longitude: number,
};

interface Params {
  uf: string, 
  city: string
}

const Points = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const navigator = useNavigation();
  const routes = useRoute();

  const routeParams = routes.params as Params;

  useEffect(() => {
    async function loadPosition(){
      const { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted')  {
        Alert.alert('Ops!, Precisamos de sua permissão para obter e localização');
        return
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }
  }, []);

  useEffect(() => {
    api.get('itens')
      .then( resp => {
        setItens(resp.data);
      })
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItem
      }
    }).then( resp => {
      setPoints(resp.data);
    })
  }, [selectedItem])

  function handleNavigateBack() {
    navigator.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigator.navigate( 'Detail', { point_id: id } );
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItem.findIndex( item => item === id);

    if (alreadySelected >= 0) {
      const filteredItens = selectedItem.filter( item => item !== id);
      setSelectedItem(filteredItens);
    } else {
      setSelectedItem([...selectedItem, id]);
    }
  }

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Feather name="arrow-left" size={20} color="#34cb79"/>
      </TouchableOpacity>

      <Text style={styles.title}>
        Bem Vindo
      </Text>
      <Text style={styles.description}>
        Encontre no mapa um ponto de coleta.
      </Text>
      <View style={styles.mapContainer}>
        { initialPosition[0] !== 0 && (
          <MapView 
          style={styles.map}
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            latitudeDelta: 0.014,
            longitudeDelta: 0.014,
          }}>

            {points.map(point => (
              <Marker
                style={styles.mapMarker}
                key={point.id}
                onPress={() => {handleNavigateToDetail(point.id)}}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude, 
                }}
              >
                <View style={styles.mapContainer}>
                  <Image style={styles.mapMarkerImage} source={{ uri: point.image}}/>
                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
              </Marker>
            ))}

          </MapView>
        )
        }
      </View>

    </View>

    <View style={styles.itemsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {itens.map( item => (
          <TouchableOpacity 
            activeOpacity={0.6} 
            style={[
              styles.item,
              selectedItem.includes(item.id) ? styles.selectedItem: {}
            ]}
            onPress={() => {handleSelectedItem(item.id)}}>
            <SvgUri width={42} height={42} key={String(item.id)} uri={item.image_url}/>
            <Text style={styles.itemTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;