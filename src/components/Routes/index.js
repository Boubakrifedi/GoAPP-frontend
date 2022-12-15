import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import SearchedProfile from '../../pages/SearchedProfil';
import Navbar from '../Navbar';
import Footer from '../Footer';

const index = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/:userId" element={<SearchedProfile/>} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default index;