import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import storage from './sync_storage';
// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  let store;

  if (isServer) {
    store = createStore(
      reducers,
      bindMiddleware([thunkMiddleware])
    );
  } else {
    // Client side
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'root',
      storage,
    }
    
    const persistedReducer = persistReducer(persistConfig, reducers); // Create a new reducer with our existing reducer

    store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );

    store.__PERSISTOR = persistStore(store);
  }

  return store
};

export const wrapper = createWrapper(makeStore);