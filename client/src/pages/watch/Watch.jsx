import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import "./watch.scss";
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
    const location = useLocation();
    console.log(location);

    return (
        <div className='watch'>
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlinedIcon />
                    Home
                </div>
            </Link>
            <video
                className='video'
                autoPlay
                progress="true"
                controls
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
            />
        </div>
    );
};

export default Watch;
