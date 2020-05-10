import React from 'react';
import { StyleSheet, Text, View, TextInput,Dimensions, TouchableOpacity, FlatList, DevSettings } from 'react-native';
import {connect} from 'react-redux';
const {width} = Dimensions.get('window');
import { updateData, addTotal, addUnAlteredData } from '@redux/Home/actions/home-view.actions';
import moment from 'moment'
import NavigationService from '@navigations/NavigationService'
import ModalCard from '@components/Modal'

class FormView extends React.Component {

  state={
    title: 'New Bill',
    description: '',
    amount: '',
    selectedCategory: 'Select Category',
    toggleCategory: false,
    billsIndex: '',
    unalteredBillsIndex: '',
    updateBill: false,
    actionButton: 'Add Bill',
    billId: '', 
    buttons: [{title: 'Cancel'}, {title: 'Ok'}],
    categoryList:  [
      {
        label: 'Food and Dining', 
        id: 1
      },
      {
        label: 'Education', 
        id: 2
      },
      {
        label: 'Personal Care', 
        id: 3
      },
      {
        label: 'Travel', 
        id: 4
      },
      {
        label: 'Shopping', 
        id: 5
      },
      {
        label: 'Utility', 
        id: 6
      }
    ]
  }

  componentDidMount(){
    if(this.props.navigation.state.params){
      const { updateBill, billsIndex, unalteredBillsIndex, data } = this.props.navigation.state.params;
      if(updateBill){
        this.setState({
          title: 'Edit Bill',
          updateBill,
          actionButton: 'Update Bill', 
          billsIndex,
          unalteredBillsIndex,
          billId: data.id,
          description: data.description,
          amount: data.amount,
          selectedCategory: data.category
        })
      }
    }
  }

  catgorySelection = (label) => {
   this.setState({selectedCategory: item.label})
  }

  toggleDropdown(){
    this.setState({toggleCategory: !this.state.toggleCategory})
  }

  goToHome(){
    NavigationService.navigate('HomeView')
  }

  addCard(){
    const { bills, updateData, addTotal, budget, unalteredBills, addUnAlteredData} = this.props;
    const {description, amount, selectedCategory, billId, billsIndex, unalteredBillsIndex, updateBill } = this.state;
    
      if(description && description !== '' && amount && amount !== '' && selectedCategory && selectedCategory !== 'Select Category'){
        let unalteredBillsList = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ?  unalteredBills : []))
        let billsList = JSON.parse(JSON.stringify(bills && bills.length > 0 ? bills : []));
        let calculateData = unalteredBillsList && unalteredBillsList.length > 0 ?  unalteredBillsList : billsList;
        let totalAmount = 0;
        let billData = {
          id:  updateBill ? billId : calculateData.length > 0 ? Number(calculateData[calculateData.length - 1].id + 1) :  1,
          description,
          amount,
          category: selectedCategory ,
          date: moment().format('MM-DD-YYYY')
        } 

        calculateData.map((item, index) => {
          totalAmount += Number(item.amount);
        });

        if(Number(totalAmount) < Number(budget)){ 

          if(billsList && billsList.length > 0){
            if(updateBill){
              billsList.splice(billsIndex, 1, billData)
            }else{
              billsList.unshift(billData)
            }
          }
          if(unalteredBillsList && unalteredBillsList.length > 0){
            if(updateBill){
              unalteredBillsList.splice(unalteredBillsIndex, 1, billData)
            }else{
              unalteredBillsList.unshift(billData)
            }
          }
    
          if(unalteredBillsList && unalteredBillsList.length > 0){
            calculateData =  unalteredBillsList;
            totalAmount = 0;
            calculateData.map((item, index) => {
              totalAmount += Number(item.amount);
            });

            if(Number(totalAmount) < Number(budget)){ 
              updateData(billsList)
              addUnAlteredData({bills: unalteredBillsList}); 
              addTotal(totalAmount);
              this.goToHome();
            }else{
              this.refs.budgetValidationPopup.show();
              totalAmount = 0;
            } 

          }else{
            calculateData = billsList;
            totalAmount = 0;
            calculateData.map((item, index) => {
              totalAmount += Number(item.amount);
            });

            if(Number(totalAmount) < Number(budget)){ 
              updateData(billsList)
              addTotal(totalAmount);
              this.goToHome();
            }else{
              this.refs.budgetValidationPopup.show();
              totalAmount = 0;
            }
          }
        
        }else{
          this.refs.budgetValidationPopup.show();
          totalAmount = 0;
        }

      }else{
         this.refs.formValidationPopup.show();
      }
  }

  renderListItem = ({item, index}) =>{
    return(
      <TouchableOpacity onPress={() => [this.setState({selectedCategory: item.label}), this.toggleDropdown()]} 
      style={[styles.selectDropdownItem, styles.selectDropdownItemColor]}>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  render(){
    const {categoryList, toggleCategory, selectedCategory, title, description, amount, actionButton, buttons} = this.state;
    const { bills, unalteredBills} = this.props;
    return (
      <View style={styles.container}>
        <Text  style={styles.title}>{title}</Text>
        <View style={styles.formContainer}>
          
          <View style={styles.inputView} >
            <Text style={styles.label}>Description</Text>
            <TextInput  
              style={styles.inputText}
              placeholderTextColor="#003f5c"
              value={description}
              onChangeText={text => this.setState({description: text})}/>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={[styles.label , styles.categoryLabel]}>Category</Text>
            <TouchableOpacity style={[ styles.selectDropdownItem, styles.selectDropdownHeader]} onPress={() => this.toggleDropdown()}>
              <Text style={styles.label}>{selectedCategory}</Text>
            </TouchableOpacity>
           { toggleCategory &&
            <View style={styles.categoryListStyle}>
              { categoryList && categoryList.length > 0 &&
                <FlatList 
                data={categoryList} 
                renderItem={this.renderListItem} 
                extraData={categoryList} 
                keyExtractor={(item, index) => `index-${item.id}-${index}`} />
              }
            </View>
           }
          </View>

          <View style={styles.inputView} >
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencyStyle}>INR</Text>
              <TextInput 
                keyboardType={'number-pad'} 
                style={styles.inputText1}
                placeholderTextColor="#003f5c"
                value={amount}
                onChangeText={text => this.setState({amount: text})}/>
            </View>
          </View>
         
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.goToHome()} style={styles.cancelBtn}>
              <Text  style={styles.btnLabel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addCard()} style={styles.addBillBtn}>
              <Text  style={styles.btnLabel}>{actionButton}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <ModalCard
          ref="budgetValidationPopup"
          buttons={buttons}
          >
          <Text
            style={styles.alertText}>
             Alert
          </Text>
          <Text
            style={styles.msgText}>
             Entered amount exceeds the monthly budget!
          </Text>
        </ModalCard>
        <ModalCard
          ref="formValidationPopup"
          buttons={buttons}
          >
          <Text
            style={styles.alertText}>
             Alert
          </Text>
          <Text
            style={styles.msgText}>
           Please fill all the fields!
          </Text>
        </ModalCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  inputView:{
    width:"90%",
    borderRadius: 12,
    height:50,
    marginBottom:30,
    marginTop: 10,
    justifyContent:"center",
    padding:10,
    borderBottomWidth: 1,
    borderColor: '#4d004d'
  },
  inputText:{
    height:50,
  },
  inputText1:{
    height:50,
    width: '100%'
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
  },
  title: {
    fontWeight: 'bold', 
    fontSize: 30, 
    color: '#4d004d',
    margin: 20
  },
  formContainer: {
    flexDirection: 'column', 
    marginVertical: 20, 
    marginLeft:22
  },
  label: {
    fontWeight: 'bold', 
    fontSize: 14, 
    color: '#4d004d'
  },
  categoryLabel: {
    marginTop: 4, 
    marginHorizontal: 10
  },
  selectDropdownItem: {
    borderWidth: 0.5, 
    borderColor:  '#4d004d', 
    width: '85%', 
    padding: 10, 
    marginHorizontal: 10,
  },
  selectDropdownHeader: {
    marginTop: 20,
  },
  selectDropdownItemColor: {
    backgroundColor: 'white'
  },
  categoryContainer: {
    marginBottom: 30, 
    flexDirection: 'column'
  },
  categoryListStyle: {
    position: 'absolute', 
    zIndex: 1, 
    elevation: 2,
    top: 84, 
    width: '100%'
  },
  amountContainer: {
    flexDirection: 'row'
  },
  currencyStyle: {
    fontSize: 16, 
    color: '#4d004d', 
    paddingRight: '1%', 
    top: 14
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 10, 
    marginVertical: 100
  },
  cancelBtn: {
    width: 100, 
    height: 50, 
    backgroundColor: '#660000', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  addBillBtn: {
    width: 200, 
    height: 50, 
    backgroundColor: '#4d004d', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 20
  },
  btnLabel: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: 'white'
  }
})

const mapStateToProps = state => ({
  bills: state.homeViewReducer.homeView.bills,
  unalteredBills: state.homeViewReducer.homeView.unalteredBills,
  budget: state.homeViewReducer.homeView.budget
});

const mapDispatchToProps = dispatch => ({
  updateData: data => dispatch(updateData(data)),
  addTotal: data => dispatch(addTotal(data)),
  addUnAlteredData: data => dispatch(addUnAlteredData(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormView);


