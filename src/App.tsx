import React from 'react';
import './App.css';
import AppStoreProvider from "@src/AppStoreProvider";
import AppRouter from "@src/AppRouter";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AppStoreProvider>
            <AppRouter/>
            <ToastContainer position="top-center"
                            autoClose={2000}/>
        </AppStoreProvider>

    );
}

export default App;
