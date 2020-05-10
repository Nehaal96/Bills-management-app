import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import NavigationService from '@navigations/NavigationService'

export default class LoginView extends React.Component {
     
  state={
    email: '',
    password: '',
    isEmailValid: true,
    isPwdValid: true
  }

  loginAuth(){
      const { email, password} = this.state;
      if(email && email !== "" && password && password !== ""){
        NavigationService.navigate('HomeView');
      }else{
        if(email === "" && password === ""){
           this.setState({isEmailValid: false, isPwdValid: false})
        }else if( password === "" || email === "" ){
            if(email === ""){
                this.setState({isEmailValid: false})
            }else{
                this.setState({isPwdValid: false})
            }
        }
      }
  }

  render(){
      const { isEmailValid, isPwdValid } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Bills App</Text>
        { !isEmailValid &&
        <View style={styles.validContainer}>
          <Text style={styles.validStyle}>Please enter your Email ID</Text>
        </View>
        }
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            ref={this.emText}
            onChangeText={text => this.setState({email:text})}/>
        </View>
        { !isPwdValid &&
        <View style={styles.validContainer}>
          <Text style={styles.validStyle}>Please enter your Password</Text>
        </View>
        }
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            ref={this.pwdText}
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginAuth()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  validContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
  },
  validStyle: {
    fontSize: 14, 
    fontWeight: '600', 
    color:"#4d004d"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#4d004d",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    borderRadius: 12,
    height:50,
    marginBottom:30,
    justifyContent:"center",
    padding:20,
    borderWidth: 1,
    borderColor: '#4d004d'
  },
  inputText:{
    height:50,
  },
  forgot:{
    fontWeight:"bold",
    color: '#4d004d',
    fontSize:16
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#4d004d",
    borderRadius: 12,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});