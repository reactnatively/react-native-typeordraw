import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
export { responsiveFontSize as fontSize };
export { responsiveHeight as height };
export { responsiveWidth as width };
export { responsiveHeight as sdp };

const dimens = {
  tvVerySmall: responsiveFontSize(1.2),
  tvSmall: responsiveFontSize(1.6),
  tvNormal: responsiveFontSize(1.8),
  tvLarge: responsiveFontSize(2.2),
  tvVeryLarge: responsiveFontSize(2.6),
  ivBig: responsiveHeight(11),
  ivMedium: responsiveHeight(6),
  ivSmall: responsiveHeight(3),
  space_small: responsiveHeight(1.5),
  space_large: responsiveHeight(3),
  very_space_large: responsiveHeight(10),
  corner_radius_default: 2,
  elevation_default: 2, 
  buttonPaddingVertical: 15,
  buttonPaddingHorizontal: 25,
  buttonSmallPaddingVertical: 5,
  buttonSmallPaddingHorizontal: 15,
  buttonHightLarge: responsiveHeight(8),
  buttonHightSmall: responsiveHeight(6),
  lineThickness: 1
};

export default dimens;
