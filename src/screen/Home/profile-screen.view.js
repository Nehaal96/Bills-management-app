import React, { Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import {connect} from 'react-redux';

class ProfileView extends Component {


  render() {
    const {bills, budget, userCurrency, billedAmount, unalteredBills} = this.props;
    return (
        <View>
          <View style={styles.header}>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>John</Text>   
            </View>
          </View>
            <View style={styles.bodyContent}>
                <View style={styles.listContainer}>
                    <Text style={styles.headingText}>&bull; Email ID :  </Text>
                    <Text style={styles.desText}>john@gmail.com</Text>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.headingText}>&bull; Monthly Budget :  </Text>
                    <Text style={styles.desText}>{userCurrency} {budget}</Text>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.headingText}>&bull; Billed Amount:  </Text>
                    <Text style={styles.desText}>{userCurrency} {billedAmount}</Text>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.headingText}>&bull; Bills for payment :  </Text>
                    <Text style={styles.desText}>{unalteredBills && unalteredBills.length > 0 ? unalteredBills.length : bills.length}</Text>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
      fontSize: 16,
      fontWeight: 'bold'
  },
  desText: {
    fontSize: 16
  },
  descriptionBody: {
    flex: 1,
  },
  nameContainer: {
    alignItems: 'center'
  },
  header:{
    height: 230,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 50,
    elevation: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor:  '#b3b3ff'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    marginTop: 40
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    paddingHorizontal: 30,
  },
  name:{
    fontSize:28,
    fontWeight: "600"
  },
  listContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10
  }
});
 

const mapStateToProps = state => ({
  bills: state.homeViewReducer.homeView.bills,
  unalteredBills: state.homeViewReducer.homeView.unalteredBills,
  budget: state.homeViewReducer.homeView.budget,
  userCurrency: state.homeViewReducer.homeView.userCurrency,
  billedAmount: state.homeViewReducer.homeView.billedAmount
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);


