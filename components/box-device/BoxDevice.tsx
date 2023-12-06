import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { blurhash } from '../../constants/blur-hash';

interface BoxDeviceProps {
  toggledEvent: any;
  deviceName: string;
  deviceImage: string;
  valueState?: number;
}

const BoxDevice = ({
  toggledEvent,
  deviceName,
  deviceImage,
  valueState,
}: BoxDeviceProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    if (valueState == 0 || valueState == null) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, []);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggledEvent();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={deviceImage}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <View
        style={{
          padding: 7,
          display: 'flex',
          gap: 5,
          flexDirection: 'column',
        }}>
        <View style={styles.informDevice}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Device:</Text>
          <Text>{deviceName}</Text>
        </View>
        <View style={styles.informDevice}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Current:</Text>
          <Text>120V</Text>
        </View>
        <View style={styles.informDevice}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Power:</Text>
          <Text>200 kW/h</Text>
        </View>
        <View style={styles.informDevice}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Value:</Text>
          <Text>{valueState}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default BoxDevice;
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 5,
    overflow: 'hidden',
    width: 160,
    height: 'auto',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 90,
    backgroundColor: '#0553',
  },
  informDevice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
