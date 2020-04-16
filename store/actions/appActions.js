export const INITIALIZE = 'INITIALIZE';
export const TOGGLE_SCANING = 'TOGGLE_SCANING';
export const ADD_PERIPHERAL = 'ADD_PERIPHERAL';

export const startBle = () => {
  return async (dispatch, getState, BleManager) => {
    await BleManager.start({showAlert: false}).then(() => {
      console.log('Module Started');
    });
    dispatch({type: INITIALIZE});
  };
};

export const startScan = () => {
  return async (dispatch, getState, BleManager) => {
    BleManager.scan([], 5, true);
  };
};

export const addPeripheral = (peripheral) => {
  return {type: ADD_PERIPHERAL, peripheral: peripheral};
};
