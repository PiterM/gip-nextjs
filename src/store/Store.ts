import { createStore } from 'redux';
import { Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './RootReducer';
import { StoreState } from './StoreState';

let store: Store<StoreState>;

if (process.env.NODE_ENV === 'production') {
    store = createStore(
        rootReducer,
    );
} else {
    store = createStore(
        rootReducer,
        composeWithDevTools()
    );
}

export default store;