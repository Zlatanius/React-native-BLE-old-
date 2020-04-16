/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import BleManager from 'react-native-ble-manager';

import rootReducer from './store/reducers/appReducer';
import AppNavigatior from './navigation/AppNavigator';
import * as appActions from './store/actions/appActions';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument(BleManager)),
);

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = (props) => {
  useEffect(() => {
    const discoverPeripheralHandler = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    // const stopedScaningHandler = bleManagerEmitter.addListener(
    //   'BleManagerStopScan',
    //   handleStopScan,
    // );
    return () => {
      discoverPeripheralHandler.remove();
      //stopedScaningHandler.remove();
    };
  }, [bleManagerEmitter, handleDiscoverPeripheral]);

  const handleDiscoverPeripheral = (peripheral) => {
    const peripherals = store.getState().discoveredDevices;
    if (!peripherals[peripheral.id]) {
      console.log('Adding peripheral');
      store.dispatch(appActions.addPeripheral(peripheral));
    }
  };

  // const handleStopScan = () => {  // Mislim da ovdje trebam koristiti useCallback
  //   discoverPeripheralHandler.remove();
  //   stopedScaningHandler.remove();
  // };

  return (
    <Provider store={store}>
      <AppNavigatior />
    </Provider>
  );
};

export default App;
