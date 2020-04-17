import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as appActions from '../store/actions/appActions';
import DeviceItem from '../components/deviceItem';

const ScanDevicesScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    setIsRefreshing(true);
    console.log('Started Scan');
    if (isInitialised) {
      dispatch(appActions.startScan());
    }
    setIsRefreshing(false);
  };

  const selectDeviceHandler = (id) => {
    console.log(currPeripherals.find((item) => item.id === id));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.devicesContainer}>
        <FlatList
          onRefresh={startScan}
          refreshing={isRefreshing}
          data={currPeripherals}
          renderItem={(itemData) => {
            return (
              <DeviceItem
                name={itemData.item.name}
                id={itemData.item.id}
                numOfServices={itemData.item.advertising.serviceUUIDs.length}
                pressHandler={selectDeviceHandler.bind(this, itemData.item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} title="SCAN" onPress={startScan} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  devicesContainer: {
    width: '100%',
    height: '80%',
  },
  buttonsContainer: {
    width: '80%',
    height: '20%',
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 5,
  },
});

export default ScanDevicesScreen;
