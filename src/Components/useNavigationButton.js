import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class MyBackButton extends React.Component {
    render() {
      // Get it from props
      const { navigation } = this.props
      return <Button 
      title='回  退'
      color='orange'
      onPress={() => {
        navigation.goBack();
      }}/>
    }
  }
  
  // Wrap and export
  export default function(props) {
    const navigation = useNavigation();
  
    return <MyBackButton {...props} navigation={navigation} />
  }