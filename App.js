import React, { Component } from 'react';  
import { StyleSheet, View , Text} from 'react-native';  
import NavigationService from '@navigations//NavigationService';
import AppNavigator from '@navigations/router';

export default class LoginView extends Component {  
  render() {  
    return (  
    <View style={{ flex: 1 }}>
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
    );  
  }  
}  
  
const styles = StyleSheet.create({  
 
});  