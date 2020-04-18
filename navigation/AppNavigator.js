import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ScanDevicesScreen from '../screens/ScanDevicesScreen';
import ServicesScreen from '../screens/ServicesScreen';

const AppStackNavigator = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen
          name="ScanDevices"
          component={ScanDevicesScreen}
        />
        <AppStackNavigator.Screen name="Services" component={ServicesScreen} />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
