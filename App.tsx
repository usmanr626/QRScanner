import React from 'react';

import {View, Text} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigation from './src/routes/AppNavigator';
import mobileAds from 'react-native-google-mobile-ads';

const App = () => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('Google Ad init', adapterStatuses);
    });
  return <AppNavigation />;
};

export default App;
