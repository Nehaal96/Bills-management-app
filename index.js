import React from 'react';
import {AppRegistry, StatusBar, KeyboardAvoidingView, SafeAreaView, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
console.disableYellowBox = true;

const GlobalStore = () => (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <App />
        </KeyboardAvoidingView>
    </PersistGate>
    </Provider>
  );

AppRegistry.registerComponent(appName, () => GlobalStore);
