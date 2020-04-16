import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ScanDevicesScreen from '../screens/ScanDevicesScreen';

const AppStackNavigator = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen
          name="ScanDevices"
          component={ScanDevicesScreen}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
