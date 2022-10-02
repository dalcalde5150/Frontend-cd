import React from 'react';
import Home from './views/Home';
import SignIn from './views/SignIn';
import Register from './views/Register';
import Event from './views/Event';
import { BrowserRouter as Router1, Route, Routes} from 'react-router-dom';

export default function Routes1() {
    return (
        <div>
            <Router1>
                <Routes>
                    <Route exact path="/" element={ <Home/> }  />
                    <Route exact path="/register" element={ <Register/> } />
                    <Route exact path="/signin" element={ <SignIn/> } />
                    <Route exact path="/event" element={ <Event/> } />
                </Routes>
            </Router1>
        </div>
    );
}

