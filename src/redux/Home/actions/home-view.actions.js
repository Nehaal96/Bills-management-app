import constants from '../constants'

export const updateData = data => ({
    type: constants.UPDATE_DATA,
    data,
});
  
export const updateDataSuccess = data => ({
    type: constants.UPDATE_DATA_SUCCESS,
    data,
});

export const updateDataFailure = error => ({
    type: constants.UPDATE_DATA_FAILURE,
    error,
});

export const addTotal = data => ({
    type: constants.ADD_TOTAL,
    data,
});
  
export const addTotalSuccess = data => ({
    type: constants.ADD_TOTAL_SUCCESS,
    data,
});

export const addTotalFailure = error => ({
    type: constants.ADD_TOTAL_FAILURE,
    error,
});

export const addUnAlteredData = data => ({
    type: constants.ADD_UNALTERED_DATA,
    data,
});
  
export const addUnAlteredDataSuccess = data => ({
    type: constants.ADD_UNALTERED_DATA_SUCCESS,
    data,
});

export const addUnAlteredDataFailure = error => ({
    type: constants.ADD_UNALTERED_DATA_FAILURE,
    error,
});
