import React, { Component } from 'react'
import { Text,StyleSheet,Dimensions } from 'react-native'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {createStackNavigator} from '@react-navigation/stack'

import store from './src/redux/store'
import Message from './src/pages/Message/Message'
import Play from './src/pages/Play/Play'
import Profile from './src/pages/Profile/Profile'
import Com from './src/pages/Fun/Community'
import Mov from './src/pages/Fun/Movies'
import Nav from './src/Components/Nav'
import RNCameraApp from './src/Components/RNCamera'
import Sign from './src/Components/Sign'
import Search from './src/pages/Search/Search'
import Car from './src/pages/Fun/Home/Car'
import Map from './src/pages/Fun/Home/Map'
import Chat from './src/pages/Message/Chat'
import FriendList from './src/pages/Message/FriendList'
import Login from './src/pages/Profile/Login'
import LogUp from './src/pages/Profile/LogUp'
import MsgIconWithBadge from './src/pages/Message/MsgIconWithBadge'

const Tab=createBottomTabNavigator()
const {Navigator,Screen}=Tab
const ScreenHeight=Math.round(Dimensions.get('window').height)
export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer  >
          <Navigator initialRouteName='msg'
            tabBarOptions={{
                style:{height:50},
                activeBackgroundColor:'orange',
                activeTintColor:'black',
              }
            }
          >
            <Screen name='fun' component={FunTab}  
            options={{title:'娱乐',
            tabBarIcon:()=>(<Text style={style.iconStyle}>&#xe641;</Text>)
          }}
            ></Screen>
            <Screen name='play' 
            component={Play}  options={{title:'播放',
            tabBarIcon:()=>(<Text style={style.iconStyle}>&#xe62e;</Text>)
            }}></Screen>
            <Screen name='search' 
            component={Search}  options={{title:'搜索',
            tabBarIcon:()=>(<Text style={style.iconStyle}>&#xe65a;</Text>)
            }}></Screen>
            <Screen name='msg' 
            component={MsgStack}  options={{title:'信息',
            tabBarIcon:()=><MsgIconWithBadge/>}}></Screen>
            <Screen name='profile' 
            component={ProfileStack}  options={{title:'个人',
            tabBarIcon:()=>(<Text style={style.iconStyle}>&#xe60a;</Text>)
            }}></Screen>
            <Screen name='rncamera' options={{
               tabBarButton:()=>null,tabBarVisible:false
              }
            } component={RNCameraApp}/>
            <Screen name='sign' options={{
               tabBarButton:()=>null,tabBarVisible:false
              }
            } component={Sign}/>
            <Screen name='chat' options={{tabBarVisible:false,tabBarButton:()=>null}
            } component={Chat}/>
            <Screen name='login' options={{tabBarVisible:false,tabBarButton:()=>null}
            } component={Login}/>
          </Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
const profileStack=createStackNavigator()
function ProfileStack(){
  return (
    <profileStack.Navigator headerMode="none"
    initialRouteName="detailProfile">
      <profileStack.Screen name="logup" component={LogUp}/>
      <profileStack.Screen name="detailProfile" component={Profile}/>
    </profileStack.Navigator>
  )
}
const msgStack=createStackNavigator()
function MsgStack(){
  return (
    <msgStack.Navigator headerMode="none"
    initialRouteName="msgstackmsg">
      <msgStack.Screen name="msgstackmsg" component={Message}/>
      <msgStack.Screen name="msgstacklist" component={FriendList}/>
    </msgStack.Navigator>
  )
}
const homeStack=createStackNavigator()
function HomeStack(){
  return (
    <homeStack.Navigator headerMode="none"
    initialRouteName="homecar">
      <homeStack.Screen name="homecar" component={Car}/>
      <homeStack.Screen name="homemap" component={Map}/>
    </homeStack.Navigator>
  )
}
const TopTab=createMaterialTopTabNavigator()
function FunTab(){
  return (
    <TopTab.Navigator 
    initialRouteName='home'
    tabBar={(props)=>(<Nav {...props}/>)}
    >
        <TopTab.Screen name='community' component={Com}/>
        <TopTab.Screen name='home' component={HomeStack}/>
        <TopTab.Screen name='movies' component={Mov}/>
    </TopTab.Navigator>
  )
}
const style=StyleSheet.create({
  iconStyle:{
    fontFamily:'iconfont',
    fontSize:22
  }
})
