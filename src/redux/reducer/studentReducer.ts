import { ActionType } from "../action-types";
import { Action } from "../actions/types";

const initialState = {
  userAuth: null,
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  students: [],
};

const studentReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      console.log("debug:", action.payload);

      return {
        ...state,
        userAuth: true,
        //...action.payload,
        students: [...state.students, action.payload],
        loading: false,
      };
    case ActionType.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        token: null,
        user: null,
        loading: false,
      };
    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        token: null,
        user: null,
        loading: false,
      };
    case ActionType.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        token: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default studentReducer;
