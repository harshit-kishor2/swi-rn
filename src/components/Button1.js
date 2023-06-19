// import React from 'react';
// import {StyleSheet, Text, Platform, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
// import {SPACING, TYPOGRAPHY, COLORS} from '../Resources';

// const Button1 = ({onPress, title, titleStyle, width, borderWidth}) => {
//   const presetColors = {
//     instagram: [
//       'rgba(179,150,243,1)',
//       'rgba(179,150,243,1)',
//       'rgba(65,214,199,1)',
//     ],
//   };
//   return (
//     <TouchableOpacity
//       activeOpacity={0.5}
//       onPress={onPress}
//       style={{
//         width: width ?? '100%',
//         height: SPACING.SCALE_40,
//         justifyContent: 'center',
//         alignContent: 'center',
//         borderRadius: SPACING.SCALE_8,
//         borderColor: 'skyblue',
//         borderWidth: borderWidth ?? SPACING.SCALE_0,
//         alignItems: 'center',
//       }}>
//       <AnimatedLinearGradient
//         points={{start: {x: 1, y: 0.4}, end: {x: 0.2, y: 1}}}
//         customColors={presetColors.instagram}
//         borderRadius={5}
//         speed={1000}>
//         <Text
//           style={[
//             styles.buttonText,
//             titleStyle,
//             {
//               height: SPACING.SCALE_40,
//               ...Platform.select({
//                 ios: {
//                   lineHeight: SPACING.SCALE_38,
//                 },
//                 android: {},
//               }),
//             },
//           ]}>
//           {title}
//         </Text>
//       </AnimatedLinearGradient>
//     </TouchableOpacity>
//   );
// };

// export default Button1;
// const styles = StyleSheet.create({
//   buttonText: {
//     color: COLORS.BLACK,
//     fontWeight: '700',
//     fontSize: TYPOGRAPHY.FONT_SIZE_13,
//     alignSelf: 'center',
//     alignItems: 'center',
//     paddingBottom: SPACING.SCALE_4,
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });
