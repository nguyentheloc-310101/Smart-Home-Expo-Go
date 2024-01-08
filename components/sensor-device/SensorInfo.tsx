import dayjs from 'dayjs';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SIZES } from '../../utils/theme';

interface SensorInfoProps {
  value: any;
  type: string;
  image?: any;
}
const SensorInfo = ({ value, type, image }: SensorInfoProps) => {
  var now = dayjs();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitle}>{type}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={image}
            style={{
              flex: 1,
              width: 'auto',
              height: 50,
            }}
            resizeMode="contain"
          />
          {type == 'Temperature' ? (
            <Text style={styles.title}> {value}&deg;C</Text>
          ) : (
            <View>
              <Text style={styles.title}>{value} %</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SensorInfo;
const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    padding: 6,
    width: '50%',
    borderRadius: 8,
    // height: 150,
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 16,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '700',
  },
  title: { fontSize: 30, fontWeight: '700' },
});
