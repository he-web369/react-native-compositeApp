import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Avatar,Overlay,Button } from 'react-native-elements'

const ScreenWidth=Math.round(Dimensions.get('window').width)
export default class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            showBox:false
        }

    }
    render(){
        const {navigation}=this.props
      return   (
            <View style={{flex:1}}>
                <TouchableOpacity 
                style={{flexDirection:'row',backgroundColor:"#dcdcdc",padding:10,marginBottom:20}} 
                onPress={()=>navigation.goBack()}>
                    <AIcon name="back" size={30}/>
                    <Text style={{fontSize:16,marginHorizontal:10}}>tom</Text>
                </TouchableOpacity>
                <ScrollView style={{marginBottom:100}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:10,marginBottom:10}}>
                        <Text style={{
                            marginRight:10,marginLeft:80,
                            backgroundColor:'rgba(255,165,0,.7)',
                            borderRadius:10,
                            padding:10,
                            textAlignVertical:'center'
                            }}>jsjsjsj</Text>
                        <Avatar rounded size="small" />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',paddingHorizontal:10}}>
                        <Avatar rounded size="small" onPress={()=>this.setState({showBox:true})}/>
                        <Text style={{marginLeft:10,marginRight:80,
                                    borderWidth:1,
                                    borderColor:'rgba(255,165,0,.7)',
                                    borderRadius:10,
                                    padding:10,
                                    textAlignVertical:'center'
                        }}>jsjsjfssssssssssssssssssssssssssssssssssssssssssssssssssssdddddddsfsdddddddddddddddddddddddddddddddddddddddddddddddddsj</Text>
                    </View>
                </ScrollView>
                <View style={{flexDirection:'row',height:50,
                position:'absolute',bottom:0,
                padding:5,
                justifyContent:'flex-end'
                }}>
                    <TextInput 
                    style={{width:"80%"}}
                    underlineColorAndroid="rgb(255,165,0)"
                     placeholder="请输入内容"/>
                    <TouchableOpacity 
                    style={{justifyContent:'center',
                    borderWidth:1,borderRadius:10,padding:5,
                    width:70,
                    alignItems:'center',
                    backgroundColor:'rgba(255,165,0,.4)'
                    }}>
                        <Text >发送</Text>
                    </TouchableOpacity>
                </View>
                <Overlay
                    overlayStyle={{padding:20}}
                    borderRadius={10}
                    isVisible={this.state.showBox}
                    windowBackgroundColor="rgba(0, 0, 0, .6)"
                    width={ScreenWidth-140}
                    height={370}
                    overlayBackgroundColor="white"
                    onBackdropPress={() => this.setState({ showBox: false })}
                >
                    <View style={{width:"100%",flex:1}}>
                        <Avatar
                            containerStyle={{alignSelf:'center'}}
                            size="large"
                            rounded
                            activeOpacity={0.7}
                            />
                        <Text style={{alignSelf:'center'}}>user.username</Text>
                        <Text style={{fontSize:16}}>签名:</Text>
                        <Text style={{flex:3,
                            borderWidth:2,
                            borderRadius:10,padding:5,
                            paddingHorizontal:10,
                            borderColor:"rgba(255,165,0,.7)",
                            marginVertical:5
                        }} >user.sign</Text>
                        <View style={{flexDirection:'row',marginBottom:5,height:40}}>
                            <TextInput underlineColorAndroid="rgba(255,165,0,.7)" style={{flex:2}} placeholder="输入备注名"/>
                            <Button title="备注" buttonStyle={{flex:1,backgroundColor:'gray'}}/>
                        </View>
                        <Button title="删除好友" onPress={() => this.setState({ showBox: false })}  buttonStyle={{backgroundColor:'gray'}}/>
                    </View>
                </Overlay>
            </View>
        )
    }
}