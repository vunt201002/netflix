import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

import "./listItem.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListItem = ({ index, item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMoive = async () => {
            try {
                const res = await axios.get("/v1/movies/find/" + item, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTAyNzI1MjMyMWVhMTMxNTE0MzhjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTUyNjA5NiwiZXhwIjoxNzAzMDYyMDk2fQ.UFF88WbjzC8Ru_oyK00Gpi8LpYTmM6ERGFNgyPmONIg"
                    }
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getMoive();
    }, [item]);

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>
                <div
                    className="listItem"
                    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={movie?.imgSm}
                        alt="/"
                    />
                    {isHovered && (
                        <>
                            <video src={movie?.trailer} autoPlay={true} loop/>
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrowIcon className='icon'/>
                                    <AddIcon className='icon'/>
                                    <ThumbUpOutlinedIcon className='icon'/>
                                    <ThumbDownAltOutlinedIcon className='icon'/>
                                </div>
                                <div className="itemInfoTip">
                                    <span>1h 24 min</span>
                                    <span className='limit'>{movie?.limit}</span>
                                    <span>{movie?.year}</span>
                                </div>
                                <div className='desc'>
                                    {movie?.desc}
                                </div>
                                <div className="genre">
                                    {movie?.genre}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Link>
    );
};

export default ListItem;
