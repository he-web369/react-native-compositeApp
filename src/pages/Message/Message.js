import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import FIcon from 'react-native-vector-icons/FontAwesome5'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Avatar } from 'react-native-elements'

export default class Message extends Component{
    render(){
        const {navigation}=this.props
      return   (
            <View>
                <View style={{backgroundColor:'#dcdcdc',flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
                    <TextInput 
                    style={{width:80,marginHorizontal:5,marginTop:-10}}
                    underlineColorAndroid="rgba(255,165,0,.5)"
                    placeholder="搜索好友"/>
                    <AIcon name="search1" size={30} />
                    <AIcon name="addusergroup" size={30} style={{paddingHorizontal:15}}
                    onPress={()=>navigation.navigate('msgstacklist')}
                    />
                </View>
                <ScrollView >
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('chat')}
                        style={{
                        padding:15,
                        flexDirection:'row',
                        borderBottomWidth:1,
                        borderBottomColor:'rgba(255,165,0,.5)'
                        }}>
                        <Avatar  size="medium" rounded/>
                         <View
                            style={{
                              position: 'absolute',
                              top: 6,
                              left:50,
                              backgroundColor: 'red',
                              borderRadius: 10,
                              width: 20,
                              height: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                              0
                            </Text>
                            </View>
                        <View style={{flex:2,marginHorizontal:10}}>
                            <Text style={{fontSize:17}}>tom</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'gray'}}>hhhahhah</Text>
                        </View>
                        <Text style={{color:'gray'}} >12:20</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}