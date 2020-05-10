import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import NavigationService from '@navigations/NavigationService'
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';
import { addUnAlteredData, updateData } from '@redux/Home/actions/home-view.actions';
import ModalCard from '@components/Modal'

class FilterView extends React.Component {
     
  state={
    categoryList: [],
    selectedCategories: [],
    buttons: [{title: 'Cancel'}, {title: 'Ok'}]
  }

  componentDidMount(){
    const { selectedCategories, categoryList } = this.state;
    let tempSelectedCategories = selectedCategories;
    let tempCategoryList = JSON.parse(JSON.stringify(this.props.categoryList));
    tempCategoryList.map((item, index) => {
      if(item.isChecked){
        tempSelectedCategories.push(item.label);
      }
    });
    this.setState({categoryList :  tempCategoryList ,selectedCategories: tempSelectedCategories});
  }

  checkList(index){
    const { categoryList, selectedCategories } = this.state;
    let tempList = categoryList;
    let tempSelectedCategories = selectedCategories;
    tempList[index].isChecked = !tempList[index].isChecked;
    
    if(tempList[index].isChecked){ 
      tempSelectedCategories.push(tempList[index].label);
    }else{
      let catIndex = tempSelectedCategories.findIndex(item => item === tempList[index].label)
      if(catIndex !== -1){
        tempSelectedCategories.splice(catIndex, 1)
      }
    }
    this.setState({categoryList: tempList , selectedCategories: tempSelectedCategories})
  }

  clearAll(){
    const { categoryList } = this.state;
    const { bills , addUnAlteredData, updateData, unalteredBills} = this.props;
    let tempList = categoryList;
    let billingData = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ? unalteredBills : bills)); 
    tempList.map((item, index) => {
      tempList[index].isChecked = false;
    })
    this.setState({categoryList: tempList , selectedCategories: []})
    addUnAlteredData({bills: billingData, categoryList: tempList});
    updateData(billingData);
  }
 
  renderCheckBox = ({item, index}) => {
    return(
      <View style={styles.checkBoxContainer}>
        <CheckBox checkBoxColor={'#024AA6'} checkedCheckBoxColor={'#024AA6'} isChecked={item.isChecked} onClick={() => this.checkList(index)} />
        <Text style={styles.checkBoxText}>{item.label}</Text>
      </View>
    )
  }

  backToHome(){
    NavigationService.navigate('HomeView')
  }

  applyFilter(){
    const { selectedCategories, categoryList } = this.state;
    const { bills , addUnAlteredData, updateData, unalteredBills} = this.props;
    let billingData = JSON.parse(JSON.stringify(unalteredBills && unalteredBills.length > 0 ? unalteredBills : bills)); 
    let filteredData = [];
    addUnAlteredData({bills: billingData, categoryList});
    if(selectedCategories && selectedCategories.length > 0){
      billingData.map((item, index) => {
        if(selectedCategories.includes(item.category)){
          filteredData.push(item);
        }
      });
    }else{
      filteredData = billingData;
    }
    if(filteredData && filteredData.length > 0){
      updateData(filteredData);
      this.backToHome();
    }else{
      this.refs.filterValidationPopup.show();
      let tempCategoryList = JSON.parse(JSON.stringify(categoryList));
      tempCategoryList.map((item, index) => {
        tempCategoryList[index].isChecked = false;
      })
      this.setState({categoryList: tempCategoryList})
      addUnAlteredData({categoryList: tempCategoryList});
    }
    
  }

  render(){
    const { categoryList , selectedCategories, buttons} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text  style={styles.filterText}>Filter</Text>
          <TouchableOpacity style={styles.clearAllContainer} onPress={() => this.clearAll()}>
            <Text  style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          <Text  style={styles.categoryHeading}>Categories</Text>
          { categoryList && categoryList.length > 0 && (
            <FlatList 
            data={categoryList} 
            renderItem={this.renderCheckBox} 
            extraData={categoryList} 
            keyExtractor={(item, index) => `index-${item.id}-${index}`} />
          )}    
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.backToHome()} style={styles.cancelBtn}>
            <Text  style={styles.btnLabel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.applyFilter()} style={styles.applyBtn}>
            <Text  style={styles.btnLabel}>Apply</Text>
          </TouchableOpacity>
        </View>
        <ModalCard
          ref="filterValidationPopup"
          buttons={buttons}
          >
          <Text
            style={styles.alertText}>
             Alert
          </Text>
          <Text
            style={styles.msgText}>
            Bills are not available for the selected search criteria. Try other search options.
          </Text>
        </ModalCard>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    backgroundColor: 'white', 
    paddingVertical: '2%'
  },
  btnContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20, 
    marginVertical: 80
  },
  btnLabel: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: 'white'
  },
  cancelBtn: {
    width: 100,
    height: 50, 
    backgroundColor: '#660000', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  applyBtn: {
    width: 200, 
    height: 50, 
    backgroundColor: '#4d004d', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center'
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
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  filterText: {
    fontWeight: 'bold', 
    fontSize: 30, 
    color: '#4d004d', margin: 20
  },
  clearAllContainer: {
    marginHorizontal: 20, 
    marginVertical: 30
  },
  clearAllText: {
    fontWeight: 'bold', 
    fontSize: 17, 
    color: '#024AA6', 
    margin: 10, 
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
  categoryContainer: {
    marginHorizontal: 30
  },
  categoryHeading: {
    fontWeight: 'bold', 
    fontSize: 20, 
    color: '#660000',
    margin: 10
  },
  checkBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  checkBoxText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4d004d',
    paddingLeft: '8%',
    paddingTop: 2,
    textTransform: 'capitalize',
 }
})

const mapStateToProps = state => ({
  bills: state.homeViewReducer.homeView.bills,
  categoryList: state.homeViewReducer.homeView.categoryList,
  unalteredBills: state.homeViewReducer.homeView.unalteredBills
});

const mapDispatchToProps = dispatch => ({
  addUnAlteredData: data => dispatch(addUnAlteredData(data)),
  updateData: data => dispatch(updateData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterView);
