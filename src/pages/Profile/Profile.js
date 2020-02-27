import React, { Component } from 'react'
import { Text, View ,Alert} from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AIcon from 'react-native-vector-icons/AntDesign'

export default class Profile extends Component{
    goLogin=()=>{
        Alert.alert(
            "提示信息",
            "确定退出吗？",
            [
                {text:'确定',onPress:()=>this.props.navigation.navigate('login')},
                {text:'取消',onPress:()=>{},style:'cancel'}
            ]
        )
    }
    render(){
        const {navigation}=this.props
       return  (
            <View>
                <View style={{flexDirection:'row',margin:10,marginTop:50,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Avatar size="large" rounded/>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:16}}>昵称：TOM</Text>
                        <Text style={{color:'rgba(0,0,0,0.5)'}}>用户名：username</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text>sign：content</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('logup')}
                style={{flexDirection:'row',margin:10,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <AIcon name="setting" size={24}/>
                    <Text>设置</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={this.goLogin}
                style={{margin:10,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <Text style={{textAlign:'center'}}>退出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}