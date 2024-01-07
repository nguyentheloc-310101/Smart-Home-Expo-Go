import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Image, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import { COLORS, SIZES } from '../../utils/theme';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
const slides = [
  {
    id: 1,
    title: 'Smart Home App',
    description:
      'Smart homes utilize IoT for efficient automation, enhancing security, energy management, and user comfort through interconnected devices and intelligent systems.',
    image: require('../../assets/image-slider/SmartHome1.png'),
  },
  {
    id: 2,
    title: 'Control devices in House',
    description:
      'Fully control devices and observing electrical characteristics of all appliances in house.',
    image: require('../../assets/image-slider/ControlDevice.png'),
  },
  {
    id: 3,
    title: 'Measure electrical characteristics',
    description: 'Measure and notification the predicable status of devices',
    image: require('../../assets/image-slider/onboardScreen3.png'),
  },
];
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showHomePage, setShowHomePage] = useState(true);
  return (
    <>
      {showHomePage ? (
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 15,
                  paddingTop: 100,
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: SIZES.width - 80,
                    height: 400,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: COLORS.title,
                    fontSize: SIZES.h1,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 5,
                    color: COLORS.title,
                  }}>
                  {item.description}
                </Text>
              </View>
            );
          }}
          activeDotStyle={{
            backgroundColor: COLORS.primary,
            width: 30,
          }}
          showSkipButton
          renderNextButton={() => buttonLabel('Next')}
          renderSkipButton={() => buttonLabel('Skip')}
          renderDoneButton={() => buttonLabel('Done')}
          onDone={() => {
            setShowHomePage(false);
          }}
        />
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <TabBarIcon
                  name="home"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: 'Tab Two',
              tabBarIcon: ({ color }) => (
                <TabBarIcon
                  name="image"
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
const buttonLabel = (label: any) => {
  return (
    <View
      style={{
        padding: 12,
      }}>
      <Text
        style={{
          color: COLORS.title,
          fontWeight: '600',
          fontSize: SIZES.h4,
        }}>
        {label}
      </Text>
    </View>
  );
};
