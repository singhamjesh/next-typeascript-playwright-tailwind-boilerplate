// import { createWrapper /* Context */ } from 'next-redux-wrapper';
// import thunkMiddleware from 'redux-thunk';
// import { persistStore } from 'redux-persist';
// import { configureStore } from '@reduxjs/toolkit';
// import reducer from '@/reducers';
// import persistMiddleware from '@/store/persistMiddleware';

// const isDebug = process.env.NODE_ENV !== 'production';

// // use for payload context: Context
// const makeStore = (/* context: Context */) => {
//   const isServer = typeof window === 'undefined';
//   const store: any = configureStore({
//     reducer,
//     devTools: isDebug,
//     middleware: [thunkMiddleware, persistMiddleware]
//   });

//   if (isServer) {
//     return store;
//   }

//   store['__persistor'] = persistStore(store); // Nasty hack
//   return store;
// };

// export const wrapper = createWrapper(makeStore, { debug: isDebug });

import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/reducers';

const isDebug = process.env.NODE_ENV !== 'production';

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  const store: any = configureStore({
    reducer,
    devTools: isDebug,
    middleware: [thunkMiddleware]
    // Add the serializableCheck false option
    // serializableCheck: false
  });

  if (isServer) {
    return store;
  }

  store['__persistor'] = persistStore(store); // Nasty hack
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: isDebug });

// Add the wrapper to handle HYDRATE action
export const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // Merge server state with client state
    return {
      ...state,
      ...action.payload
    };
  }
  return reducer(state, action);
};
