import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';
const socket = io('http://172.16.4.51:5000');
export default function App() {
  const API = axios.create({ baseURL: 'http://172.16.4.51:5000' });

  API.interceptors.request.use((req) => {
    req.headers['Content-Type'] = 'application/json';
    return req;
  });
  const [realtimeLed, setRealtimeLed] = useState('');
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
        // console.log(response.data);
        const result = convertObjectToArray(response.data);
        //  const formatData: ILed[] = await ServiceLed.formatDataLed(result);
        //  setAllDataLed(formatData);
        setRealtimeLed(result[0].value);
        //  setData(formatData);
      }
      return;
    };
    fetchData();
  }, []);
  const handleToggleLed = async () => {
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
  const convertObjectToArray = (obj) => {
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
      <Text>{realtimeLed}</Text>
      <Button
        title="press set value"
        onPress={handleToggleLed}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
