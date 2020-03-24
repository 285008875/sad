import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'
import reducers from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor };
