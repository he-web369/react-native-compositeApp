import React, { PureComponent } from 'react'
import {ScrollView,RefreshControl, Text, View,StyleSheet,Dimensions, Image,TouchableOpacity  } from 'react-native'
import Swiper from 'react-native-swiper'
import {Button,Divider} from 'react-native-elements'
import {getMoviesDataApi} from '../../api/index'
import {connect} from 'react-redux'
import {getMovies,resetMov,toggleRe} from '../../redux/actions'

import MoviesDetail from './MoviesDetail'

const ScreenHeight=Math.round(Dimensions.get('window').height)
class Mov extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            start:0
        }
    }
    componentDidMount(){
        getMoviesDataApi(0,10).then(res=>{
            this.props.getMovies(res.subjects)
            this.setState({
                start:this.state.start+10,
            })
            this.props.toggleRe(false)
        })
    }
    reset=()=>{
        this.setState({
            start:0
        })
        this.props.toggleRe(true)
        getMoviesDataApi(0,10).then(res=>{
            this.props.resetMov(res.subjects)
            this.setState({
                start:this.state.start+10,
            })
            this.props.toggleRe(false)
        })
    }
    handleFresh=()=>{
        if(this.state.start<=240){
            this.props.toggleRe(true)
            getMoviesDataApi(this.state.start,10).then(res=>{
                this.props.getMovies(res.subjects)
                this.setState({
                    start:this.state.start+10,
                })
                this.props.toggleRe(false)
            })
        }
    }
    handlePress=(movie)=>{
        this.props.navigation.navigate('play',{movie})
    }
    
    render(){
        const {start}=this.state
        const {movies,isrefresh}=this.props
       return  (
            <ScrollView 
                    keyboardDismissMode="on-drag"
                    refreshControl={
                        <RefreshControl
                        refreshing={isrefresh}
                        onRefresh={this.handleFresh}
                        colors={['orange']}
                    />
                }
                style={{marginTop:ScreenHeight*0.03,flex:1}}>
                    <View  style={styles.swiperContainerStyle}>
                        {movies.length>5?
                        (
                        <Swiper 
                        onIndexChanged={(index)=>this.index=index}
                        onTouchEnd={()=>this.handlePress(movies[this.index])}
                        activeDotColor="orange"
                        autoplay={true}
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
                        ):(<Text></Text>)}
                    </View>
                    <Divider/>
                    <Button onPress={this.reset} containerStyle={{margin:10,alignItems:'flex-start'}} buttonStyle={{backgroundColor:'orange'}} title="电影TOP250"/>
                    <Divider/>
                    <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                        {movies.length?
                            movies.map((movie,index)=>(
                                <TouchableOpacity onPress={()=>this.handlePress(movie)} key={index} style={index%2===1?[styles.touchableOpacityStyleEven,styles.borderStyles]:[styles.touchableOpacityStyleOdd,styles.borderStyles]} >
                                    <MoviesDetail movie={movie}/>
                                </TouchableOpacity>
                            )):<Text></Text>
                        }
                    </View>
                    <TouchableOpacity style={styles.continueLoadStyle} onPress={this.handleFresh}
                    ><Text style={{fontSize:12}}>{start<=240?"继续加载":"已到最后"}</Text>
                    </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default connect(
    state=>({movies:state.movies,isrefresh:state.refresh}),
    {getMovies,resetMov,toggleRe}
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