import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import FinanceReducer from './reducers/FinanceReducer';

const store = createStore(FinanceReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;