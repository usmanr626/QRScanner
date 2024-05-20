import {Picker} from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import BackButton from '../Components/BackButton';
import colors from '../assets/colors';
import {LABELS, updateLabels} from '../labels';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const adUnitId = __DEV__ ? Config.DEV_AD_UNIT_ID : Config.PROD_AD_UNIT_ID;

const HistoryScreen = () => {
  const route = useRoute();
  const {params} = route;
  console.log('🎯: HistoryScreen -> params', params.showCode);

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(
        params.showCode === 'scanned'
          ? 'saveScannedLinks'
          : 'savedGeneratedLinks',
      );
      if (value !== null) {
        // value previously stored

        console.log('🎯: Successfully fetched getData -> ', value);
        setLinkData(JSON.parse(value));
      }
    } catch (e) {
      // error reading value

      console.log('🎯: Error in getData -> ', e);
    }
  };

  const LinkComponent = ({linkData}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(linkData).catch(err =>
            console.error('An error occured', err),
          )
        }
        style={{
          backgroundColor: 'pink',
          height: 50,
          width: '100%',
          justifyContent: 'center',
          borderRadius: 20,
          paddingHorizontal: 20,
          marginTop: '5%',
        }}>
        <Text style={{color: 'black'}}>{linkData}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.mainContainer}>
        {/* <View style={{position: 'absolute', top: 0}}> */}
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
        <BackButton onPress={() => navigation.goBack()} />
        <View
          style={{
            top: '12%',
            padding: 10,
            // width: '100%',
            alignItems: 'center',
            // backgroundColor: 'orange',
          }}>
          <FlatList
            contentContainerStyle={{paddingBottom: '50%', width: '100%'}}
            horizontal={false}
            data={linkData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <LinkComponent linkData={item} />}
          />
        </View>
      </View>
      {/* </View> */}
    </>
  );
};
export default HistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
});
