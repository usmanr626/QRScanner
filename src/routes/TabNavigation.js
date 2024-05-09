// import React from 'react';
// // import Home from '../screens/Home';
// import HomeScreen from '../screens/HomeScreen';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Image, Platform, StyleSheet, Text, View} from 'react-native';
// import GenerateQR from '../screens/GenerateQR';
// import ImagePath from '../Constants/ImagePath';

// const Tab = createBottomTabNavigator();

// const TabNavigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarIconStyle: styles.tabBarIconStyle,
//         tabBarLabelStyle: styles.tabBarLabelStyle,
//         headerShown: false,
//         tabBarStyle: {height: Platform.OS === 'android' ? '121%' : '8.5%'}, // Set the height of the tab bar here
//       }}>
//       <Tab.Screen
//         name="Scan Code"
//         component={HomeScreen}
//         options={{
//           tabBarStyle: () => {},
//           tabBarIcon: () => (
//             <View style={{}}>
//               <Image
//                 source={ImagePath.scanIcon}
//                 style={styles.iconStyle}
//                 resizeMode="center"
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Generate Code"
//         component={GenerateQR}
//         options={{
//           tabBarStyle: () => {},
//           tabBarIcon: () => (
//             <View style={{}}>
//               <Image
//                 source={ImagePath.generateIcon}
//                 style={styles.iconStyle}
//                 resizeMode="center"
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigation;

// const styles = StyleSheet.create({
//   tabBarIconStyle: {
//     // display: 'none',
//     bottom: 5,
//   },
//   tabBarLabelStyle: {
//     fontSize: 20,
//     // paddingBottom: 10,
//   },
//   iconStyle: {
//     width: 30,
//     height: 30,
//   },
// });

import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GenerateQR from '../screens/GenerateQR';
import ImagePath from '../Constants/ImagePath';
import {LABELS} from '../labels';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabBarButton}>
            {options.tabBarIcon
              ? options.tabBarIcon({focused: isFocused})
              : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Scan Code"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={ImagePath.scanIcon}
                style={[
                  styles.iconStyle,
                  // {tintColor: focused ? '#007AFF' : '#8E8E93'},
                ]}
                resizeMode="center"
              />
              <Text style={{color: focused ? '#007AFF' : '#8E8E93'}}>
                {LABELS.scanCode}
              </Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Generate Code"
        component={GenerateQR}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={ImagePath.generateIcon}
                style={[
                  styles.iconStyle,

                  // {tintColor: focused ? '#007AFF' : '#8E8E93'},
                ]}
                resizeMode="center"
              />
              <Text style={{color: focused ? '#007AFF' : '#8E8E93'}}>
                {LABELS.createCode}
              </Text>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#FFFFFF', // Change the background color of the tab bar here
    borderTopWidth: 1, // Add a border to the top of the tab bar
    borderTopColor: '#E0E0E0', // Set the border color
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
});
