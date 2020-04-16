import {
  INITIALIZE,
  TOGGLE_SCANING,
  ADD_PERIPHERAL,
} from '../actions/appActions';

const initialState = {
  discoveredDevices: {},
  discoveredServices: {},
  discoveredCharacteristics: {},
  selectedDevice: null,
  selectedService: null,
  selectedCharacteristic: null,
  moduleIsInitialized: false,
  isScaning: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {...state, moduleIsInitialized: true};
    case TOGGLE_SCANING:
      return {...state, isScaning: !state.isScaning};
    case ADD_PERIPHERAL:
      return {
        ...state,
        discoveredDevices: {
          ...state.discoveredDevices,
          [action.peripheral.id]: action.peripheral,
        },
      };
    default:
      return state;
  }
};
