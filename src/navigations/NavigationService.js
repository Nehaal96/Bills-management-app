import { NavigationActions,StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateWithReset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName,params})],
    })
  );
}

function navigateWithPrevious(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName: routeName,
      params: params
    })
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}


function navigatePopToTop(){
  _navigator.dispatch(
    StackActions.popToTop()
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  navigateWithReset,
  setTopLevelNavigator,
  navigatePopToTop,
  navigateWithPrevious,
};