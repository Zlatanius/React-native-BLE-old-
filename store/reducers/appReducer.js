import {INITIALIZE, ADD_PERIPHERAL} from '../actions/appActions';

const initialState = {
  discoveredDevices: [],
  discoveredServices: [],
  discoveredCharacteristics: [],
  selectedDevice: null,
  selectedService: null,
  selectedCharacteristic: null,
  moduleIsInitialized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {...state, moduleIsInitialized: true};
    case ADD_PERIPHERAL:
      return {
        ...state,
        discoveredDevices: state.discoveredDevices.concat(action.peripheral),
      };
    default:
      return state;
  }
};
