import constants from '../constants';

const initialState = {
  bills: [
    {
    "id": 1,
    "description": "Dominoes",
    "category": "Food and Dining",
    "category_code": "FD",
    "amount": "430",
    "date": "01-02-2020"
    },
    {
    "id": 2,
    "description": "Car wash",
    "category": "Utility",
    "category_code": "UT",
    "amount": "500",
    "date": "01-06-2020"
    },
    {
    "id": 3,
    "description": "Amazon",
    "category": "Shopping",
    "category_code": "SH",
    "amount": "2030",
    "date": "01-07-2020"
    },
    {
    "id": 4,
    "description": "House rent",
    "category": "Food and Dining",  
    "category_code": "FD",
    "amount": "5000",
    "date": "01-03-2020"
    },
    {
    "id": 5,
    "description": "Tuition",
    "category": "Education",
    "category_code": "ED",
    "amount": "2200",
    "date": "01-12-2020"
    },
    {
    "id": 6,
    "description": "Laundry",
    "category": "Personal Care",
    "amount": "320",
    "date": "01-14-2020"
    },
    {
    "id": 7,
    "description": "Vacation",
    "category": "Travel",
    "amount": "3430",
    "date": "01-18-2020"
    }
  ],
  budget: 15000,
  userCurrency: 'INR',
  billedAmount: '',
  categoryList: [
    {
      label: 'Food and Dining', 
      id: 1,
      isChecked: false
    },
    {
      label: 'Education', 
      id: 2,
      isChecked: false
    },
    {
      label: 'Personal Care', 
      id: 3,
      isChecked: false
    },
    {
      label: 'Travel', 
      id: 4,
      isChecked: false
    },
    {
      label: 'Shopping', 
      id: 5,
      isChecked: false
    },
    {
      label: 'Utility', 
      id: 6,
      isChecked: false
    }
  ],
  unalteredBills: []
};

const homeViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_DATA:
      return {
        ...state,
      };
    case constants.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        bills: action.data
      };
    case constants.UPDATE_DATA_FAILURE:
      return {
        ...state,
      };
    case constants.ADD_TOTAL:
      return {
        ...state,
      };
    case constants.ADD_TOTAL_SUCCESS:
      return {
        ...state,
        billedAmount: action.data
      };
    case constants.ADD_TOTAL_FAILURE:
    return {
      ...state,
    };
    case constants.ADD_UNALTERED_DATA:
      return {
        ...state,
      };
    case constants.ADD_UNALTERED_DATA_SUCCESS:
      return {
        ...state,
        unalteredBills: action.data.bills ? action.data.bills: state.unalteredBills,
        categoryList: action.data.categoryList ? action.data.categoryList: state.categoryList
      };
    case constants.ADD_UNALTERED_DATA_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default homeViewReducer;
