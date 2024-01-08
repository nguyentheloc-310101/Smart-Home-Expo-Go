import axios from 'axios';
import { Image } from 'expo-image';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';
import BoxDevice from '../../components/box-device/BoxDevice';
import { SPACING } from '../../constants/spacing';
import { COLORS } from '../../utils/theme';
import SensorInfo from '../../components/sensor-device/SensorInfo';

const imageTemp = require('../../assets/images/temperature.png');
const imageHumid = require('../../assets/images/humidity.png');

const socket = io(`http://192.168.1.4:5000`);
const API = axios.create({ baseURL: `http://192.168.1.4:5000` });

API.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/json';
  return req;
});
export default function TabOneScreen() {
  const [realtimeLed, setRealtimeLed] = useState<any>();
  const [realtimeHumid, setRealtimeHumid] = useState<any>();

  const [realtimeTemperature, setRealtimeTemperature] = useState<any>();
  const [handleToggleDevice, setHandleToggleDevice] = useState<any>();
  const [realtimeFan, setRealtimeFan] = useState<any>();

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    socket.on('ledUpdate', ({ led }) => {
      setRealtimeLed(led);
      console.log(`ledUpdate: ${led}`);
    });
    socket.on('humidityUpdate', ({ humidity }) => {
      setRealtimeHumid(humidity);
      console.log(`humidityUpdate: ${humidity}`);
    });
    socket.on('temperatureUpdate', ({ temperature }) => {
      setRealtimeTemperature(temperature);
      console.log(`temperatureUpdate: ${temperature}`);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseTemperature = await API.get('/api/data/dataTemp');

      if (responseTemperature) {
        const result = convertObjectToArray(responseTemperature.data);
        setRealtimeTemperature(result[0].value);
        console.log('Temper', result[0].value);
      }

      return;
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseHumid = await API.get('/api/data/dataHumidity');

      if (responseHumid) {
        const result = convertObjectToArray(responseHumid.data);
        setRealtimeHumid(result[0].value);
        console.log('humid', result[0].value);
      }

      return;
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get('/api/data/dataLed');

      if (response) {
        const result = convertObjectToArray(response.data);
        // console.log('result', result);
        setRealtimeLed(result[0].value);
      }
      return;
    };
    fetchData();
  }, []);

  const handleToggleLedLed = async () => {
    const ipLocal = await Network.getIpAddressAsync();

    // console.log(ipLocal);
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
    <ScrollView style={styles.container}>
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
          deviceName={'LIGHT'}
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
          toggledEvent={setHandleToggleDevice}
          deviceName={'Device'}
          deviceImage={
            'https://i.pinimg.com/564x/91/1a/e2/911ae201e8ed80400c49d5f3d3ade63c.jpg'
          }
        />
        <BoxDevice
          toggledEvent={setHandleToggleDevice}
          deviceName={'Device'}
          deviceImage={
            'https://i.pinimg.com/564x/91/1a/e2/911ae201e8ed80400c49d5f3d3ade63c.jpg'
          }
        />
      </View>
      <View style={styles.sensorContainer}>
        <SensorInfo
          image={imageTemp}
          value={realtimeTemperature}
          type={'Temperature'}
        />
        <SensorInfo
          value={realtimeHumid}
          image={imageHumid}
          type={'Humidity'}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  sensorContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 10,
    marginTop: 10,
    padding: 10,
  },
});
