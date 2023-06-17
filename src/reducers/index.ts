import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as formReducer } from 'redux-form';

// import reducers
import authReducer from './auth';
import userReducer from './user';
import agentReducer from './agent';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'email']
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user']
};

const agentPersistConfig = {
  key: 'agent',
  storage,
  whitelist: ['agentQueue', 'agents', 'agentData']
};

export default combineReducers({
  form: formReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
  agent: persistReducer(agentPersistConfig, agentReducer)
});
