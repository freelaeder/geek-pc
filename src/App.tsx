import React from 'react';
import './App.css';
import AppStoreProvider from "@src/AppStoreProvider";
import AppRouter from "@src/AppRouter";

function App() {
    return (
        <AppStoreProvider>
            <AppRouter/>
        </AppStoreProvider>

    );
}

export default App;
