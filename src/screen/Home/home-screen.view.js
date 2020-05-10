import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import TabBar from '@components/TabBar'
import ProfileView from './profile-screen.view'
import BillsView from './bills-screen.view'
import NavigationService from '@navigations/NavigationService'
import {connect} from 'react-redux';
import ModalCard from '@components/Modal'

class HomeView extends React.Component {
     
  state={
    labels: [
        {title: 'Bills', key: 0},
        {title: 'Profile', key: 1}
      ],
    buttons: [{title: 'Cancel'}, {title: 'Ok'}],
    selectedTab: 0
  }

  screenPanel(){
    const {selectedTab} = this.state;
    if(selectedTab === 0){
      return <BillsView/>
    }else if(selectedTab === 1){
       return <ProfileView/>
    }
  }

  goToAddForm(){
    const { budget, billedAmount} = this.props;
    if(Number(billedAmount) < Number(budget)){
      NavigationService.navigate('FormView')
    }else{
      this.refs.budgetCheck.show();
    }
  }

  
  render(){
    const { labels, selectedTab, buttons} = this.state;
    return (
      <View style={styles.container}>
        <TabBar
            labels={labels}
            value={selectedTab}
            onChange={key => {
                this.setState({ selectedTab: key });
            }}
        />
        { this.screenPanel() }
        { selectedTab === 0 && (
        <TouchableOpacity 
          onPress={() => this.goToAddForm()}
          style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        )}
        <ModalCard
          ref="budgetCheck"
          buttons={buttons}
          >
          <Text
            style={styles.alertText}>
             Alert
          </Text>
          <Text
            style={styles.msgText}>
            There is monthly budget remaining!
          </Text>
        </ModalCard>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  addButton: {
    position: 'absolute', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
    zIndex: 1, 
    bottom: 30, 
    right: 20, 
    backgroundColor: '#009933', 
    width: 60, 
    height: 60,
    borderRadius: 32
  },
  addText: {
    fontWeight: '700', 
    fontSize: 40, 
    color: 'white', 
    bottom: 3
  },
  alertText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  msgText: {
    fontSize: 14,
    textAlign: 'center',
  }
});
 

const mapStateToProps = state => ({
  budget: state.homeViewReducer.homeView.budget,
  billedAmount: state.homeViewReducer.homeView.billedAmount
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
