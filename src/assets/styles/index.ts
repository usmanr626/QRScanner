import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../colors';
// import {FONTS} from '../fonts';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

/*
 ** List of style that are required throughout the app
 */

export const GlobalStyles = StyleSheet.create({
  /*
   ** Global styles
   */

  mainContainer: {
    flex: 1,
    backgroundColor: '#F4f4f4',
  },
  mainImageStyle: {
    width: '100%',
    height: '100%',
  },

  smallBtn1Style: {
    width: WIDTH * 0.4,
    height: 45,
    backgroundColor: COLORS.primary,
  },
  smallBtn2Style: {
    width: WIDTH * 0.4,
    height: 45,
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
  btn2textStyle: {
    color: COLORS.grey5,
  },
  btn1textStyle: {
    color: COLORS.white,
  },
  largeBtnStyle: {
    width: WIDTH - 70,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },

  largeBtn2Style: {
    width: WIDTH - 70,
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey5,
  },

  largeBtnTextStyle: {
    color: COLORS.white,
  },

  largeBtnTextStyle2: {
    color: COLORS.grey6,
  },

  row: {flexDirection: 'row', alignItems: 'center'},

  middle: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  /*
   ** Fonts styles
   */
//   h1Big: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 48,
//   },
//   h1: {
//     fontFamily: FONTS.poppinsBold,
//     fontSize: 30,
//   },
//   h2: {
//     fontFamily: FONTS.poppinsBold,
//     fontSize: 24,
//   },
//   h3: {
//     fontFamily: FONTS.poppinsBold,
//     fontSize: 14,
//   },
//   h4: {
//     fontFamily: FONTS.poppinsBold,
//     fontSize: 36,
//   },
//   h5: {
//     fontFamily: FONTS.poppinsBold,
//     fontSize: 18,
//   },
//   //labelfont style
//   l1: {
//     fontFamily: FONTS.poppinsMedium,
//     fontSize: 14,
//   },
//   l2: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 14,
//   },
//   l3: {
//     fontFamily: FONTS.poppinsMedium,
//     fontSize: 16,
//   },
//   l4: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 16,
//   },
//   l5: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 13,
//   },
//   l6: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 12,
//   },
//   l7: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 16,
//   },
//   l8: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 18,
//   },
//   l9: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 12,
//     lineHeight: 16,
//   },
//   //body font style
//   b1: {
//     fontFamily: FONTS.poppinsMedium,
//     fontSize: 14,
//   },
//   b2: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 14,
//   },
//   b3: {
//     fontFamily: FONTS.poppinsLight,
//     fontSize: 14,
//   },
//   b4: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 12,
//   },
//   b5: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 8,
//   },
//   BigUint64Array: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 15,
//   },
//   b6: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 24,
//   },
//   b7: {
//     fontFamily: FONTS.poppinsRegular,
//     fontSize: 15,
//   },
// 
});
