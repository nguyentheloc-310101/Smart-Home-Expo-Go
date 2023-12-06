import axios from 'axios';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';
import BoxDevice from '../../components/box-device/BoxDevice';
import { SPACING } from '../../constants/spacing';
import { COLORS } from '../../utils/theme';
import * as Network from 'expo-network';
import useNetwork from '../../stores/ip-address';
const socket = io(`http://192.168.2.23:5000`);
const API = axios.create({ baseURL: `http://192.168.2.23:5000` });
API.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/json';
  return req;
});
export default function TabOneScreen() {
  const [realtimeLed, setRealtimeLed] = useState<any>();
  const [realtimeFan, setRealtimeFan] = useState<any>();

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    socket.on('ledUpdate', ({ led }) => {
      setRealtimeLed(led);
      console.log(`ledUpdate: ${led}`);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get('/api/data/dataLed');
      if (response) {
        const result = convertObjectToArray(response.data);
        setRealtimeLed(result[0].value);
      }
      return;
    };
    fetchData();
  }, []);

  const handleToggleLedLed = async () => {
    const ipLocal = await Network.getIpAddressAsync();

    console.log(ipLocal);
    // fetch('https://jsonip.com/')
    //   .then((res) => res.text())
    //   .then((ip) => console.log(ip));
    let tmp = 0;
    if (realtimeLed === 1) {
      tmp = 0;
      setRealtimeLed(0);
    } else {
      tmp = 1;

      setRealtimeLed(1);
    }
    const sendData = tmp;
    API.post('/api/data/toggleLed', { value: sendData.toString() });
  };
  const handleToggleLedFan = async () => {
    API.interceptors.request.use((req) => {
      req.headers['Content-Type'] = 'application/json';
      return req;
    });
    let tmp = 0;
    if (realtimeFan === 1) {
      tmp = 0;
      setRealtimeFan(0);
    } else {
      tmp = 1;

      setRealtimeFan(1);
    }
    const sendData = tmp;
    API.post('/api/data//setFan', { value: sendData.toString() });
  };
  const convertObjectToArray = (obj: any) => {
    const array = [];

    for (let i = 0; obj[i] !== undefined; i++) {
      array.push(obj[i]);
    }
    const { feed_key, message, ...rest } = obj;
    array.push(rest);

    return array;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: SPACING * 2,
            fontWeight: 'bold',
            color: COLORS.dark as string,
          }}>
          Welcome to Smart Home
        </Text>
        <Image
          style={{
            height: SPACING * 5,
            width: SPACING * 5,
            borderRadius: SPACING * 5,
          }}
          source={require('../../assets/home/Avatar.png')}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          justifyContent: 'center',
        }}>
        <BoxDevice
          toggledEvent={handleToggleLedLed}
          deviceName={'LED'}
          valueState={realtimeLed}
          deviceImage={
            'https://images.unsplash.com/photo-1552862750-746b8f6f7f25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
        <BoxDevice
          toggledEvent={handleToggleLedFan}
          deviceName={'FAN'}
          deviceImage={
            'https://images.unsplash.com/photo-1618941716939-553df3c6c278?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
        <BoxDevice
          toggledEvent={undefined}
          deviceName={'Unknown'}
          deviceImage={''}
        />
        <BoxDevice
          toggledEvent={undefined}
          deviceName={'Unknown'}
          deviceImage={''}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
