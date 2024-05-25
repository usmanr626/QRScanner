import {Picker} from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Modal,
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
import Barcode from '@kichiyaki/react-native-barcode-generator';
import QRCode from 'react-native-qrcode-svg';
import {WIDTH} from '../assets/styles';

const adUnitId = __DEV__ ? Config.DEV_AD_UNIT_ID : Config.PROD_AD_UNIT_ID;

const HistoryScreen = () => {
  const route = useRoute();
  const {params} = route;
  console.log('🎯: HistoryScreen -> params', params.showCode);

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const [linkData, setLinkData] = useState([]);
  const [codeReady, setCodeReady] = useState(false);
  const [modalImageString, setModalImageString] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log('🎯: getData -> getData');
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
      } else {
        console.log('🎯: getData -> noData');
      }
    } catch (e) {
      // error reading value

      console.log('🎯: Error in getData -> ', e);
    }
  };

  const openModal = imageString => {
    console.log('🎯: openModal -> ', imageString);
    setModalImageString(imageString);
    setCodeReady(true);
  };

  const closeModal = () => {
    setCodeReady(false);
    setModalImageString('');
  };

  const LinkComponent = ({linkData}) => {
    console.log('🎯: LinkComponent -> linkData', linkData);
    let imageString = linkData;
    let dateString = '';
    if (params?.showCode === 'generated') {
      [imageString, dateString] = linkData.split(' - ');
    }
    console.log('🎯: LinkComponent -> imageString', modalImageString);
    return (
      <TouchableOpacity
        // onPress={() =>

        // Linking.openURL(linkData).catch(err =>
        //   console.error('An error occured', err),
        // )
        // }

        onPress={() =>
          params?.showCode === 'generated'
            ? openModal(imageString)
            : Linking.openURL(linkData).catch(err =>
                console.error('An error occured', err),
              )
        }
        style={
          params?.showCode === 'generated'
            ? styles.linkComponentWithImageStyle
            : styles.linkComponentStyle
        }>
        {params?.showCode === 'generated' && (
          <>
            <Image
              source={{uri: imageString}}
              style={{width: 45, height: 45}}
            />
            <View style={{left: 5}}>
              <Text style={styles.linkTextStyle}>
                {LABELS.generatedOn}
                {dateString}
              </Text>
            </View>
          </>
        )}
        <Text style={styles.linkTextStyle}>
          {params?.showCode === 'generated' ? null : linkData}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <View style={{position: 'absolute', top: 0}}> */}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      <BackButton onPress={() => navigation.goBack()} />

      {linkData.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatlistContentContainer}
          horizontal={false}
          data={linkData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <LinkComponent linkData={item} />}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.linkTextStyle}>{LABELS.noData}</Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={codeReady}
        visible={codeReady}
        onRequestClose={closeModal}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalInnerContainer}>
            <Image
              source={{uri: modalImageString}}
              style={{width: 200, height: 200}}
              // defaultSource={require('../assets/default-image.png')} // Path to your default image
              onError={error =>
                console.log('Modal Image loading error: ', error)
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default HistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  flatlistContentContainer: {
    paddingBottom: '50%',
    alignItems: 'center',
    top: '12%',
  },
  linkComponentStyle: {
    backgroundColor: colors.secondary,
    // height: 50,
    minWidth: '90%',
    maxWidth: '90%',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: '5%',
    alignItems: 'center',
  },
  linkComponentWithImageStyle: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    // height: 50,
    minWidth: '90%',
    maxWidth: '90%',
    justifyContent: 'space-between',

    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: '5%',
    alignItems: 'center',
  },
  linkTextStyle: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.black,
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: WIDTH / 2,
    height: 150,
    position: 'absolute',
    right: 20,
    top: 100,
  },
  modalMainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalInnerContainer: {
    width: WIDTH * 0.9,
    height: '95%',
    borderRadius: 40,
    backgroundColor: colors.grey6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    height: 50,
    backgroundColor: colors.primary,
    top: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
