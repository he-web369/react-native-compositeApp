import React, { Component } from 'react'
import {Text,View,Image} from 'react-native'

export default class MoviesDetail extends Component{
    render(){
        let {movie}=this.props
        return (movie?
            <View style={{alignItems:'center'}}>
                <Image source={{uri:movie.images.small}} style={{width:"100%",height:'80%'}}/>
                <Text style={{marginTop:5}}>{movie.title}</Text>
            </View>:<View></View>
        )
    }
}