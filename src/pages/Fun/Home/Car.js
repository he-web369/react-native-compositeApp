import React, { useState, useEffect } from 'react'
import { View ,Text,Dimensions,SectionList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Button,Divider,ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Aicon from 'react-native-vector-icons/AntDesign'

import HomeHeader from './HomeHeader'
const ScreenHeight=Math.round(Dimensions.get('window').height)

function Car({navigation,isRe}){
    const [isOpen,setIsOpen]=useState(false)
    const [rightIsOpen,setRightIsOpen]=useState(false)
    const [index,setIndex]=useState(0)
    const [secIndex,setSecIndex]=useState(0)
    const [resetP,setResetP]=useState({top:0,right:0})
    const [rightTopP,setRightTopP]=useState(0)
    const showOpen=(i)=>{
        if(index===i){
            if(isOpen){
                setIsOpen(false)
                setRightIsOpen(false)
            }else{
                setIsOpen(true)
            }
            setResetP({top:i*50,right:0})
            return
        }
        setRightIsOpen(false)
        setIsOpen(true)
        setIndex(i)
        setResetP({top:i*50,right:0})
    }
    const jumpT=(i)=>{
        if(secIndex===i){
            if(rightIsOpen){
                setResetP({top:index*50,right:0})
            }else{
                setResetP({top:index*50,right:'30%'})
            }
            setRightIsOpen(!rightIsOpen)
            setRightTopP(i*50+resetP.top)
            return
        }
        setSecIndex(i)
        setRightIsOpen(true)
        setResetP({top:index*50,right:'30%'})
        setRightTopP(i*50+resetP.top)
    }
    const handlePress=()=>{
        setRightIsOpen(false)
        setIsOpen(false)
        setResetP({top:0,right:0})
        setRightTopP(0)
    }
    return (
        <ScrollView 
        style={{marginTop:ScreenHeight*0.03}}>
            <HomeHeader navigation={navigation} index={0}/>
            <View style={{flexDirection:'row',flexWrap:'wrap',paddingHorizontal:"6%",paddingVertical:10}}>
                {
                    new Array(26).fill('').map((item,index)=>(
                        <Button 
                        onPress={()=>handlePress(index+65)}
                        containerStyle={{padding:5,width:"11%"}} 
                        key={index} 
                        title={String.fromCharCode(index+65)}/>
                    ))
                }
            </View>
            <Divider style={{height:2}}/>
            <View style={{height:(brands.length+cars.length+detail.length)*50,flexDirection:'row',padding:10,position:'relative'}}>
                <View style={{width:'55%'}}>
                    {
                        brands.map((item,i)=>(
                            <ListItem
                                onPress={()=>showOpen(i)}
                                containerStyle={{height:50,backgroundColor:'rgba(192,192,192,0.5)'}}
                                key={i}
                                title={item}
                                bottomDivider
                                chevron={<Icon name='angle-right'size={20}/>}
                                leftIcon={
                                    i===index?<Icon name='car-side'size={20}/>:<Icon name='car'size={20}/>
                                }
                            />
                        ))
                    }
                </View>
                <View style={{zIndex:10,top:resetP.top,margin:10,position:'absolute',width:"45%",right:resetP.right}}>
                    {isOpen?
                        cars.map((item,i)=>(
                            <ListItem
                                onPress={()=>jumpT(i)}
                                containerStyle={{height:50,backgroundColor:'rgb(192,192,192)'}}
                                key={i}
                                title={item}
                                chevron={<Icon name='angle-right'size={20}/>}
                                bottomDivider
                                leftIcon={
                                    i===secIndex?<Icon name='car-side'size={20}/>:<Icon name='car-crash'size={20}/>
                                }
                            />
                        )):<Text></Text>
                    }
                </View>
                <View style={{zIndex:10,top:rightTopP,margin:10,position:'absolute',width:"30%",right:0}}>
                    {rightIsOpen?
                        detail.map((item,index)=>(
                            <ListItem
                                containerStyle={{height:50,backgroundColor:'rgba(192,192,192,0.8)'}}
                                key={index}
                                title={item}
                                bottomDivider
                                leftIcon={
                                    <Aicon name='car'size={20}/>
                                }
                            />
                        )):<Text></Text>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
export default Car
const brands=['奔驰','本田','奥迪','宝马','丰田']
const cars=['1系','2系','3系','4系','5系']
const detail=['325','330','316','318','335']