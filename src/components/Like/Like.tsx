import React, {useState} from 'react';
import SideBarElement from '../../containers/SideBarElement/SideBarElement';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './Like.module.css';

type LikeProps = {
    number: number;
}

const Like: React.FC<LikeProps> = ({number}) => {
    const [liked, setLiked] = useState(false);

    const handleClick = async () => {
        setLiked(!liked);
        await fetch('/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: 'AWSYoKZmi0zdjqi4bXy2', likes: number}),
        })
    }
    return (
        <SideBarElement
            onClick={handleClick}
        >
            {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" /> }
            <p className={styles.title}>{liked ? number+1 : number}</p>
        </SideBarElement>
    );
};

export default Like;