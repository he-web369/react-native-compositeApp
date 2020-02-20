import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Provider} from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import store from './src/redux/store'
import Message from './src/pages/Message/Message'
import Addfriend from './src/pages/Addfriend/Addfriend'
import Play from './src/pages/Play/Play'
import Profile from './src/pages/Profile/Profile'
import Home from './src/pages/Fun/Home'
import Com from './src/pages/Fun/Community'
import Mov from './src/pages/Fun/Movies'
import Nav from './src/Components/Nav'
import RNCameraApp from './src/Components/RNCamera'
import Sign from './src/Components/Sign'

const Tab=createBottomTabNavigator()
const {Navigator,Screen}=Tab
const ScreenHeight=Math.round(Dimensions.get('window').height)

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer  >
          <Navigator initialRouteName='fun'
            tabBarOptions={{
              tabStyle :{justifyContent:'center'},
                style:{height:ScreenHeight*0.07},
                activeBackgroundColor:'orange',
                activeTintColor:'black',
                labelStyle:{fontSize:16,fontWeight:'bold'}
              }
            }
          >
            <Screen name='fun' component={FunTab}  
            options={{title:'娱乐'}}
            ></Screen>
            <Screen name='play' 
            component={Play}  options={{title:'播放'}}></Screen>
            <Screen name='addFri' 
            component={Addfriend}  options={{title:'添加'}}></Screen>
            <Screen name='msg' 
            component={Message}  options={{title:'信息'}}></Screen>
            <Screen name='profile' 
            component={Profile}  options={{title:'个人'}}></Screen>
            <Screen name='rncamera' options={{
               tabBarButton:()=>null
              }
            } component={RNCameraApp}/>
            <Screen name='sign' options={{
               tabBarButton:()=>null
              }
            } component={Sign}/>
          </Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
const TopTab=createMaterialTopTabNavigator()

function FunTab(){
  return (
    <TopTab.Navigator 
    initialRouteName='home'
    tabBar={(props)=>(<Nav {...props}/>)}
    >
        <TopTab.Screen name='community' component={Com}/>
        <TopTab.Screen name='home' component={Home}/>
        <TopTab.Screen name='movies' component={Mov}/>
        
    </TopTab.Navigator>
  )
}
