/**
 * 二维码扫描组件
 */
import React, { PureComponent } from 'react'
import { StyleSheet, Text, View,Animated,Button } from 'react-native'
import { RNCamera } from 'react-native-camera'

import MyBackButton from './useNavigationButton' 
export default class RNCameraApp extends PureComponent {
    
    render() {
    return (
      <View style={{justifyContent:'center'}}>
        <RNCamera
          style={styles.preview}
          autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={{backgroundColor: 'rgba(0,0,0,0)',height:200,width:200}}/>
        </RNCamera>
        <MyBackButton/>
      </View>
    )
  }
  onBarCodeRead = (result) => {
    const {data} = result
    }
}
const styles=StyleSheet.create({
    
})

