export const LOGIN = "LOGIN";

export const LOGOUT = "LOGOUT";

export const SELECT_LOCATION = "SELECT_LOCATION";

export const LOAD_LOGGED_IN = "LOAD_LOGGED_IN";

export const DEPOSIT_FORM = "DEPOSIT_FORM";

export const DEPOSIT_CONFIRM = "DEPOSIT_CONFIRM";

export const SUBMIT_FORM = "SUBMIT_FORM";

export const READ_USER_DETAILS = "READ_USER_DETAILS";

export const FINISH_ONBOARD = "FINISH_ONBOARD";

export const loginAction = (name: string, uid: string, isNewUser: boolean) => ({
  type: LOGIN,
  payload: { userName: name, uid: uid, isNewUser: isNewUser ?? false },
});

export const logoutAction = () => ({
  type: LOGOUT,
});

// export const loadLoggedInUser = (name: string, uid: string) => ({
//   type: LOAD_LOGGED_IN,
//   payload: { userName: name, uid: uid },
// });

export const finishOnboard = () => ({
  type: FINISH_ONBOARD,
});

export const selectLocation = (
  location: string,
  coordinates: {
    latitude: string;
    longitude: string;
  }
) => ({
  type: SELECT_LOCATION,
  payload: { coordinates: coordinates, location: location },
});

export const depositFormFill = (
  dropoffPoint: string,
  beforeImage: string,
  recycledObject: string
  // photoBefore: file
) => ({
  type: DEPOSIT_FORM,
  payload: { form: { dropoffPoint, recycledObject, beforeImage } },
});

export const depositFormConfirm = (afterImage: string) => ({
  type: DEPOSIT_CONFIRM,
  payload: { afterImage },
});

export const depositFormSubmit = () => ({
  type: SUBMIT_FORM,
});

export const readUserDetails = (name: number, isYouth: boolean) => ({
  type: READ_USER_DETAILS,
  payload: { name, isYouth },
});
