import React from 'react'
import { View ,Text,Dimensions,StyleSheet } from 'react-native'
import {Button,Divider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ScreenHeight=Math.round(Dimensions.get('window').height)

function HomeHeader({index,navigation,point,distance}){
    const toCar=()=>{
        if(index===1){
            navigation.navigate('homecar')
        }
    }
    const toMap=()=>{
        if(index===0){
            navigation.navigate('homemap')
        }
    }
    const styles=StyleSheet.create({
        mapStyle:{
            flexDirection:'row',
            padding:10,
            paddingBottom:5,
            justifyContent:'space-evenly',
        }
    })
    return (
            <View >
                <View style={!point?{
                    alignSelf:'center',
                    flexDirection:'row',
                    padding:10,
                    justifyContent:'space-evenly',
                    width:"50%"}:styles.mapStyle}>
                        {index?
                        <Button 
                        onPress={toCar}
                        buttonStyle={{height:60,width:60,backgroundColor:"rgba(255,165,0,.7)"}}
                        icon={<Icon name="car-side" size={30}
                        />}/>:
                        <Button 
                        onPress={toCar}
                        buttonStyle={{height:60,width:60,backgroundColor:"rgba(255,165,0,.7)"}}
                        icon={<Icon name="car" size={30}
                        />}/>
                        }
                        {index?
                        <Button 
                        onPress={toMap}
                        buttonStyle={{height:60,width:60,backgroundColor:"rgba(255,165,0,.7)"}}
                        icon={<Icon name="map-marked" size={30}
                        />}/>:
                        <Button 
                        onPress={toMap}
                        buttonStyle={{height:60,width:60,backgroundColor:"rgba(255,165,0,.7)"}}
                        icon={<Icon name="map-marked-alt" size={30}
                        />}/>
                        }
                        {point?
                        <View style={{width:"60%",
                        borderWidth:1,
                        borderRadius:5,
                        padding:2,
                        borderColor:"rgba(255,165,0,.7)"}}>
                            <Text >当前：{point[2].substring(8)}</Text>
                            <Divider />
                            <Text>起始：{point[0]||'无'}</Text>
                            <Divider />
                            <Text>目标：{point[1]||'无'}</Text>
                            <Divider />
                            <Text>距离：{Math.round(distance)}米</Text>
                        </View>:null
                        }
                </View>
                <Divider style={{height:2}}/>
            </View>
    )
}
export default HomeHeader