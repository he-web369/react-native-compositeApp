/**
 * 二维码扫描组件
 */
import React, { PureComponent } from 'react'
import { StyleSheet, Text, View,Animated,Button ,Dimensions, Easing} from 'react-native'
import { RNCamera } from 'react-native-camera'

import MyBackButton from './useNavigationButton'
const width= Math.round(Dimensions.get('window').width)
export default class RNCameraApp extends PureComponent {
    state={
      content:'',
      position:new Animated.Value(-3)
    }
    chnage=()=>{
      Animated.loop(
          Animated.sequence([
            Animated.timing(
              this.state.position,
              {
                toValue:196,
                duration:2000,
                easing:Easing.linear()
              }
            ),Animated.timing(
              this.state.position,
              {
                toValue:0,
                duration:2000,
                easing:Easing.linear()
              }
            )
          ])
      ).start()
    }
    componentDidUpdate(){
      this.chnage()
    }
    componentDidMount(){
      this.chnage()
    }
    render() {
    return (
      <View >
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
          <View style={{height:150,backgroundColor:"rgba(0,0,0,.5)"}}/>
          <View style={{flexDirection:'row',height:200}}>
            <View style={{width:(width-200)/2,backgroundColor:"rgba(0,0,0,.5)"}}/>
            <View style={{width:200,backgroundColor:"transparent",
            borderWidth:1,
            borderColor:'rgba(255,165,0,.5)'}}>
              <Animated.View style={{
                transform:[{translateY:this.state.position}],
                height:3,backgroundColor:'rgb(255,165,0)'}}></Animated.View>
            </View>
            <View style={{width:(width-200)/2,backgroundColor:"rgba(0,0,0,.5)"}}/>
          </View>
          <View style={{height:150,backgroundColor:"rgba(0,0,0,.5)"}}>
            <Text style={{color:"rgba(255,255,255,.5)",textAlign:'center',marginTop:10}}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
        <View style={{flexDirection:'row',padding:10,
          borderRadius:5,margin:20,borderColor:'rgba(255,165,0,.7)',borderWidth:1
        }}>
          <Text style={{fontSize:15,flex:1
            }}>扫码结果：{this.state.content}</Text>
        </View>
        <MyBackButton/>
      </View>
    )
  }
  onBarCodeRead = (result) => {
    const {data} = result
    this.setState=({content:data})
    }
}
const styles=StyleSheet.create({
  preview:{
    width:'100%',
    height:500
  }
})

