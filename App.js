/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useCallback} from 'react';
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
    return () => {
      discoverPeripheralHandler.remove();
    };
  }, [bleManagerEmitter, handleDiscoverPeripheral]);

  const handleDiscoverPeripheral = useCallback(
    (peripheral) => {
      const peripherals = store.getState().discoveredDevices;
      if (!peripherals.find((per) => per.id === peripheral.id)) {
        console.log('Adding peripheral');
        store.dispatch(appActions.addPeripheral(peripheral));
      }
    },
    [store],
  );

  return (
    <Provider store={store}>
      <AppNavigatior />
    </Provider>
  );
};

export default App;
