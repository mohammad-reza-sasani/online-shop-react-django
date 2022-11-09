
//applyMiddleware
// برای استفاده از میان افزار است 

//compose
//برای ترکیب کردن

import {legacy_createStore  as  createStore , applyMiddleware , compose} from "redux";

import thunk from "redux-thunk";

import { reducers } from "../reducers";

export const store = createStore(
    reducers,
    // چون بیشتر از 2 پارامتر قبول نمیکند از 
    // compose
    //استفاده کردیم
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//subscribe
store.subscribe(() => console.log(store.getState()));