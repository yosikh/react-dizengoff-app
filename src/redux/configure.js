import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import floorReducer from './reducer';

const initialState = {
    floor: [],
    orders: []
};

export const Store = createStore(floorReducer, initialState, applyMiddleware(thunk));