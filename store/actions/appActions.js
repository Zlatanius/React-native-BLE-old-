export const startBle = () => {
  return async (dispatch, getState, BleManager) => {
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('Module Started');
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

// export const startScan = () => {
//   return async (dispatch, getState, BleManager) => {
//     await BleManager.scan([], 5, true);
//   };
// };
