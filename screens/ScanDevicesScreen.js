import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {useDispatch} from 'react-redux';
import BleManager from 'react-native-ble-manager';

import * as appActions from '../store/actions/appActions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ScanDevicesScreen = (props) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState(new Map());

  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    dispatch(appActions.startBle());
    setIsInitialised(true);
  }, [dispatch]);

  useEffect(() => {
    const discoverPeripheralHandler = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    return () => {
      discoverPeripheralHandler.remove();
    };
  });

  const handleDiscoverPeripheral = (peripheral) => {
    const peripherals = discoveredPeripherals;

    if (!peripherals.get(peripheral.id)) {
      console.log('Adding peripheral');
      peripherals.set(peripheral.id, peripheral);
      setDiscoveredPeripherals(peripherals);
    }
  };

  const startScan = () => {
    console.log('Started Scan');
    if (isInitialised) {
      BleManager.scan([], 5, true);
    }
  };

  const selectPeripheralHandler = () => {
    console.log(discoveredPeripherals);
  };

  return (
    <View>
      <Button title="SCAN" onPress={startScan} />
      <Button title="Show peripherals" onPress={selectPeripheralHandler} />
    </View>
  );
};

export default ScanDevicesScreen;
