import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import financeReducer from './reducers/financeReducer';

const store = createStore(financeReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;