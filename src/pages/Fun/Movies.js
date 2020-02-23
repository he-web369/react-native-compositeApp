import React, { PureComponent } from 'react'
import {ScrollView,RefreshControl, Text, View,StyleSheet,Dimensions, Image,TouchableOpacity  } from 'react-native'
import Swiper from 'react-native-swiper'
import {connect} from 'react-redux'

import {getMoviesDataAsync} from '../../redux/actions'
import MoviesDetail from './MoviesDetail'

const ScreenHeight=Math.round(Dimensions.get('window').height)
class Mov extends PureComponent{
    constructor(props){
        super(props)
        this.refresh=React.createRef()
        this.props.getMoviesDataAsync(1,10)
        this.state={
            start:11
        }
    }
    handleFresh=()=>{
        if(this.state.start<=240){
            this.refresh.current.refreshing=true
            this.props.getMoviesDataAsync(this.state.start,10)
            this.setState({
                start:this.state.start+10
            })
        }
    }
    handlePress=(movie)=>{
        this.props.navigation.navigate('play',{movie})
    }
    pressRe=()=>{
        if(this.state.start<=240){
            this.props.getMoviesDataAsync(this.state.start,10)
            this.setState({
                start:this.state.start+10
            })
        }
    }
    render(){
        const movies=this.props.movies||[]
        let {start}=this.state
        const isRefresh=this.props.movies.isRefresh||false
       return  (
            <ScrollView 
                    keyboardDismissMode="on-drag"
                    refreshControl={
                        <RefreshControl
                        ref={this.refresh}
                        refreshing={isRefresh}
                        onRefresh={this.handleFresh}
                        colors={['orange']}
                    />
                }
                style={{marginTop:ScreenHeight*0.03,flex:1}}>
                    <View  style={styles.swiperContainerStyle}>
                        <Swiper 
                        onIndexChanged={(index)=>this.index=index}
                        onTouchEnd={()=>this.handlePress(movies[this.index])}
                        autoplay
                        activeDotColor="orange"
                        >
                            {movies.slice(0,5).map((movie,index)=>(
                                <View key={index} >
                                    <Image source={{uri:movie.images.medium}}
                                    resizeMode='stretch'
                                    resizeMethod='scale'
                                     style={styles.imageStyle} />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <View style={styles.lineStyle}></View>
                    <Text style={{fontSize:20,marginLeft:20}}>电影TOP250</Text>
                    <View style={styles.lineStyle}></View>
                    <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                        {
                            movies.map((movie,index)=>(
                                <TouchableOpacity onPress={()=>this.handlePress(movie)} key={index} style={index%2===1?[styles.touchableOpacityStyleEven,styles.borderStyles]:[styles.touchableOpacityStyleOdd,styles.borderStyles]} >
                                    <MoviesDetail movie={movie}/>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <TouchableOpacity style={styles.continueLoadStyle} onPress={this.pressRe}
                    ><Text style={{fontSize:12}}>{start<=240?"继续加载":"已到最后"}</Text>
                    </TouchableOpacity>
            </ScrollView>
        )
    }
}
export default connect(
    state=>({movies:state.movies}),
    {getMoviesDataAsync}
)(Mov)
const styles=StyleSheet.create({
    lineStyle:{
        width:'100%',
        height:2,
        backgroundColor:'black',
        opacity:0.2,
        marginVertical:5
    },
    imageStyle:{
        width:"100%",
        height:"100%",
    },
    swiperContainerStyle:{
        alignSelf:'center',
        width:'90%',
        height:240,
        marginVertical:5,
        borderWidth:2,
        borderStyle:'dashed',
        borderColor:'orange'
    },
    borderStyles:{
        borderWidth:2,
        borderStyle:'dashed',
        borderColor:'orange'
    },
    touchableOpacityStyleOdd:{
        width:"44%",
        height:150,
        marginTop:10,
        marginLeft:"4%"
    },
    touchableOpacityStyleEven:{
        width:"44%",
        height:150,
        marginHorizontal:"4%",
        marginTop:10,
    },
    continueLoadStyle:{
        width:"100%",
        marginVertical:10,
        height:40,
        backgroundColor:"orange",
        alignItems:'center',
        justifyContent:'center'
    }
})