import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/rootReducer';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

export default function configureStore(initialstate) {
    return createStore(
        rootReducer,
        initialstate
       //applyMiddleware(reduxImmutableStateInvariant)
    )
}