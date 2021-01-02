import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { reduxFirestore,  getFirestore, createFirestoreInstance } from "redux-firestore";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase';

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase, fbConfig)
    )
);

const config = {
    userProfile: "users",
    useFirestoreForProfile: true
}

const rrfProps = {
    firebase,
    config,
    dispatch: store.dispatch,
    createFirestoreInstance
};

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth);

    if (!isLoaded(auth)) {
        return <div>Loading Screen...</div>;
    } else {
        return children
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>, 
    document.getElementById('root')
);
