import * as React from 'react';
import { Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class MyBackButton extends React.Component {
    render() {
      // Get it from props
      const { navigation } = this.props
      return <TouchableOpacity
      style={{width:'100%',height:50,justifyContent:'center',backgroundColor:'orange'}}
      onPress={() => {
        navigation.goBack()
      }}
      >
        <Text 
        style={{fontFamily:'iconfont',fontSize:30,color:"white",marginLeft:"90%"}}>&#xe65f;</Text>
      </TouchableOpacity>
    }
  }
  
  // Wrap and export
  export default function(props) {
    const navigation = useNavigation();
  
    return <MyBackButton {...props} navigation={navigation} />
  }