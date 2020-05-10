import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { updateData, addTotal, addUnAlteredData } from '@redux/Home/actions/home-view.actions';
import moment from 'moment'
import NavigationService from '@navigations/NavigationService'

class BillCard extends React.Component {
   state= {
     billsIndex: '',
     unalteredBillsIndex: ''
   }

  componentDidMount(){
    const { billIndex ,bills, unalteredBills} = this.props;
    let unalteredBillsData = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ? unalteredBills : []))
    let billsData = JSON.parse(JSON.stringify(bills && bills.length > 0 ? bills : []))
    let unalteredBillsIndex = unalteredBillsData && unalteredBillsData.length > 0 ? unalteredBillsData.findIndex( item => item.id === billIndex) : '';
    let billsIndex = billsData.findIndex( item => item.id === billIndex);

    this.setState({billsIndex: billsIndex !== '' && billsIndex !== -1 ? billsIndex: '', unalteredBillsIndex: unalteredBillsIndex !== '' && unalteredBillsIndex !== -1 ? unalteredBillsIndex: ''})
  }

  deleteCard(){
    const { data, bills, updateData, addTotal, unalteredBills, addUnAlteredData, categoryList} = this.props;
    const { billingData , billsIndex, unalteredBillsIndex} = this.state;
    let tempCategoryList = categoryList;
    let unalteredBillsData = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ?  unalteredBills : []))
    let billsData = JSON.parse(JSON.stringify(bills && bills.length > 0 ? bills : []));
    let totalAmount = 0;
    let calculateData = unalteredBills && unalteredBills.length > 0 ?  unalteredBills : billsData;

    if(billsData && billsData.length > 0){
      billsData.splice(billsIndex, 1);
      updateData(billsData);
    }
    
    if(unalteredBills && unalteredBills.length > 0  && unalteredBillsIndex !== -1 && unalteredBillsIndex !== ''){
      unalteredBillsData.splice(unalteredBillsIndex, 1);
      addUnAlteredData({bills: unalteredBillsData});
      if(!billsData || billsData.length === 0 ){
        updateData(unalteredBillsData);
        tempCategoryList.map((item, index) => {
          tempCategoryList[index].isChecked = false;
        })
        addUnAlteredData({categoryList: tempCategoryList});
      }
    }
    
    calculateData.map((item, index) => {
      totalAmount += Number(item.amount);
    })
    addTotal(totalAmount);

  }

  goToAddForm(data){
    const { billsIndex, unalteredBillsIndex } = this.state;
    NavigationService.navigate('FormView', {updateBill: true, data, billsIndex, unalteredBillsIndex})
  }

  render(){
    const { data , userCurrency, bills, unalteredBills} = this.props;
    return (
      <View style={styles.container} >
       <View style={styles.headerContainer}>
        <Text style={styles.containerText}>{data.category}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity 
            onPress={() => this.goToAddForm(data)}
            style={styles.editContainer}>
            <Text style={styles.labelText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.deleteCard()}
            style={styles.deleteBtn}>
            <Text style={styles.labelText}>Delete</Text>
          </TouchableOpacity>
        </View>
       </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>{data.description}</Text>
          <Text style={styles.dateLabel}>Created at {moment(data.date).format('DD MMM, YYYY')}</Text>
        </View>
        <Text style={styles.amountLabel}>{userCurrency} {data.amount}</Text>
      </View> 
    );
  }
}

const mapStateToProps = state => ({
  bills : state.homeViewReducer.homeView.bills,
  userCurrency: state.homeViewReducer.homeView.userCurrency,
  unalteredBills: state.homeViewReducer.homeView.unalteredBills,
  categoryList: state.homeViewReducer.homeView.categoryList
});

const mapDispatchToProps = dispatch => ({
    updateData: data => dispatch(updateData(data)),
    addTotal: data => dispatch(addTotal(data)),
    addUnAlteredData: data => dispatch(addUnAlteredData(data))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(BillCard);
    

const styles = StyleSheet.create({
    container: {
        width: width - 35, 
        borderRadius: 12,
        minHeight:100, 
        flexDirection: 'column', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#b3b3ff',
        marginVertical: 10,
        elevation: 3,
        flexDirection: 'column',
        flexGrow: 1,
        padding: '3%'
    },
    headerContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingVertical: '2%', 
      paddingHorizontal: '1%'
    },
    containerText: {
      fontWeight: 'bold', 
      fontSize: 16, 
      color:  '#4d004d'
    },
    btnContainer: {
      flexDirection: 'row', 
      justifyContent: 'flex-end'
    },
    editContainer: {
      width: 60, 
      height: 30, 
      borderRadius: 25, 
      backgroundColor: '#4d004d', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginHorizontal: '2%'
    },
    labelText: {
      fontWeight: 'bold', 
      fontSize: 12, 
      color:  'white'
    },
    deleteBtn: {
      width: 60, 
      height: 30, 
      borderRadius: 25, 
      backgroundColor: '#660000', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginHorizontal: '2%'
    },
    descriptionContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      margin: 5
    },
    descriptionLabel: {
      fontSize: 14, 
      color: '#595959'
    },
    dateLabel: {
      fontSize: 12, 
      color: '#595959', 
      top: 4
    },
    amountLabel: {
      fontWeight: 'bold',
      fontSize: 13, 
      paddingHorizontal: '2%'
    }
  });