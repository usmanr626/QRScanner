import React from 'react';
// import Home from '../screens/Home';
import HomeScreen from '../screens/HomeScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import GenerateQR from '../screens/GenerateQR';
import ImagePath from '../Constants/ImagePath';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Scan QR Code"
        component={HomeScreen}
        options={{
          tabBarStyle: () => {},
          tabBarIcon: () => (
            <View style={{}}>
              <Image
                source={ImagePath.scanIcon}
                style={styles.iconStyle}
                resizeMode="center"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Generate QR Code"
        component={GenerateQR}
        options={{
          tabBarStyle: () => {},
          tabBarIcon: () => (
            <View style={{}}>
              <Image
                source={ImagePath.generateIcon}
                style={styles.iconStyle}
                resizeMode="center"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarIconStyle: {
    // display: 'none',
    bottom: 25,
  },
  tabBarLabelStyle: {
    fontSize: 18,
    // paddingBottom: 10,
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
});
