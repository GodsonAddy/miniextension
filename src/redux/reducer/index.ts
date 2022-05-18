import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["students"],
};

const rootReducer = combineReducers({
  studentAuth: studentReducer,
});

export default persistReducer(persistConfig, rootReducer);
