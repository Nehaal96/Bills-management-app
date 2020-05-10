import React from 'react';
import {View, ScrollView, FlatList, StyleSheet , TouchableOpacity, Text} from 'react-native';
import BillCard from '@components/BillCard'
import {connect} from 'react-redux';
import { addTotal } from '@redux/Home/actions/home-view.actions';
import NavigationService from '@navigations/NavigationService'

class BillsView extends React.Component {

  componentDidMount(){
    const { bills, addTotal, unalteredBills} = this.props;
    let billingData = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ? unalteredBills :  bills))
    let totalAmount = 0;
    billingData.map((item, index) => {
      totalAmount += Number(item.amount);
    })
    addTotal(totalAmount);
  }

  goToFilterScreen(){
    NavigationService.navigate('FilterView')
  }

  renderBillCard = ({item, index}) =>{
    return(
      <BillCard
        billIndex={item.id}
        data={item}
      />
    )
  }

  render(){
    const { bills } = this.props;
    return(
      <ScrollView>
        <View style={styles.genContainer}>
          <TouchableOpacity 
            onPress={() => this.goToFilterScreen()}
            style={styles.filterContainer}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          { bills && bills.length > 0 ?
            <FlatList 
            data={bills} 
            renderItem={this.renderBillCard} 
            extraData={bills} 
            keyExtractor={(item, index) => `index-${item.id}-${index}`} />
            : <Text style={styles.noBills}>There are no bills available.</Text>
          }
        </View> 
      </ScrollView> 
    )
  }
}

const mapStateToProps = state => ({
  bills: state.homeViewReducer.homeView.bills,
  unalteredBills: state.homeViewReducer.homeView.unalteredBills
});

const mapDispatchToProps = dispatch => ({
  addTotal: data => dispatch(addTotal(data))
});


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20
  },
  genContainer: {
    flexDirection: 'row', 
    marginTop: 10, 
    marginBottom: 5, 
    marginHorizontal: 20
  },
  filterContainer: {
    width: 80, 
    height: 40, 
    borderRadius: 25, 
    backgroundColor: '#009933', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: '2%'
  },
  filterText: {
    fontWeight: 'bold', 
    fontSize: 14, 
    color:  'white'
  },
  noBills: {
    fontWeight: 'bold', 
    fontSize: 18, 
    color: '#660000', 
    marginVertical: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BillsView);
