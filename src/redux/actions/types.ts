import { ActionType } from "../action-types";

interface LOGINFAILUREACTION {
  type: ActionType.LOGIN_FAILURE;
}

interface LOGINSUCCESSACTION {
  type: ActionType.LOGIN_SUCCESS;
  payload: any;
}

interface LOGOUTACTION {
  type: ActionType.LOGOUT;
}

interface AUTHERRORACTION {
  type: ActionType.AUTH_ERROR;
}

interface USERLOADEDACTION {
  type: ActionType.USER_LOADED;
  payload: any;
}

interface USERLOADINGACTION {
  type: ActionType.USER_LOADING;
}

interface CLEARALLACTION {
  type: ActionType.CLEAR_ALL;
  payload: string;
}

interface ERRORMESSAGEACTION {
  type: ActionType.ERROR_MESSAGE;
  payload: string;
}

export type Action =
  | LOGINFAILUREACTION
  | LOGINSUCCESSACTION
  | USERLOADEDACTION
  | USERLOADINGACTION
  | AUTHERRORACTION
  | LOGOUTACTION
  | CLEARALLACTION
  | ERRORMESSAGEACTION;
