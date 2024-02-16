import React, { useState } from 'react';
import Header from '../Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Home from '../Home/Home';

const HomeLayout = () => {
  
    
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;