import { applyMiddleware, createStore } from "redux";
import { Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./RootReducer";
import rootSaga from "./RootSaga";
import { StoreState } from "./StoreState";

let store: Store<StoreState>;

const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === "production") {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
} else {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
}

sagaMiddleware.run(rootSaga);

export default store;
