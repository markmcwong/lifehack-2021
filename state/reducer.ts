import * as actions from "./actions";
import { addDepositRecord } from "../services/firestore";

const initialState = {
  user: { name: null, uid: null, isNewUser: false, isYouth: null },
  coordinates: null,
  location: null,
  form: {
    dropoffPoint: null,
    recycledObject: null,
    beforeImage: null,
    afterImage: null,
  },
};

export default (state = initialState, action: any) => {
  console.log(state);
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.userName ?? state.user.name,
          uid: action.uid,
          isNewUser: action.isNewUser,
          // isYouth: action.isYouth,
        },
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: { name: null, uid: null, isNewUser: false, isYouth: false },
      };
    case actions.FINISH_ONBOARD:
      return {
        ...state,
        user: { ...state.user, isNewUser: false },
      };
    // case actions.LOAD_LOGGED_IN:
    //   return {
    //     ...state,
    //     user: { name: action.userName, uid: action.uid, isNewUser: false, },
    //   };
    case actions.SELECT_LOCATION:
      console.log(action.location);
      return {
        ...state,
        coordinates: action.coordinates,
        location: action.location,
      };
    case actions.DEPOSIT_FORM:
      console.log(action);
      return {
        ...state,
        form: {
          dropoffPoint: action.dropoffPoint,
          recycledObject: action.recycledObject,
          beforeImage: action.beforeImage,
        },
      };
    case actions.DEPOSIT_CONFIRM:
      console.log(action);
      console.log(state);
      return {
        ...state,
        form: {
          ...state.form,
          afterImage: action.afterImage,
        },
      };
    // case actions.SUBMIT_FORM:
    //   console.log(state);
    //   addDepositRecord(
    //     state.user.uid,
    //     state.form.dropoffPoint,
    //     state.form.recycledObject,
    //     state.form.beforeImage,
    //     state.form.afterImage,
    //     state.user.reward
    //   );
    //   return {
    //     ...state,
    //     form: {},
    //   };
    case actions.READ_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
          isYouth: action.isYouth,
        },
      };
    default:
      return state;
  }
};
