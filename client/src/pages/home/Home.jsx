import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Featured from '../../component/featured/Featured';
import List from '../../component/list/List';
import Navbar from '../../component/navbar/Navbar';
import "./home.scss"

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomList = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/v1/lists${type ? "&type=" + type : ""}${genre ? "&genre=" + genre : ""}`);
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomList();
    }, [type, genre]);

    return (
        <div className='home'>
            <Navbar />
            <Featured type={type}/>
            {lists.map((list, index) => (
                <List key={index} list={list}/>
            ))}
        </div>
    );
};

export default Home;
