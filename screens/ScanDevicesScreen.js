import React, {useEffect, useState} from 'react';
import {Text, View, Button, Platform, PermissionsAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as appActions from '../store/actions/appActions';

const ScanDevicesScreen = (props) => {
  const dispatch = useDispatch();

  const isInitialised = useSelector((state) => state.moduleIsInitialized);
  const currPeripherals = useSelector((state) => state.discoveredDevices);

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
  }, [PermissionsAndroid]);

  useEffect(() => {
    dispatch(appActions.startBle());
  }, [dispatch]);

  const startScan = () => {
    console.log('Started Scan');
    if (isInitialised) {
      dispatch(appActions.startScan());
    }
  };

  const selectPeripheralHandler = () => {
    console.log(currPeripherals);
  };

  return (
    <View>
      <Button title="SCAN" onPress={startScan} />
      <Button title="Show peripherals" onPress={selectPeripheralHandler} />
    </View>
  );
};

export default ScanDevicesScreen;
