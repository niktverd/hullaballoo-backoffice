import React from 'react'
import ControlsLayout from '../../containers/ControlsLayout/ControlsLayout';
import CardFooter from '../CardFooter/CardFooter';
import Player from '../Player/Player';

import styles from './Card.module.css';

const _videoUrl = 'https://v16-webapp.tiktok.com/a173368b3cb264a1096a3f15f8ba616d/6281632a/video/tos/alisg/tos-alisg-pve-0037c001/4ceae21c2f6b46a2bc80cb9f6ee7032e/?a=1988&br=1072&bt=536&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=eXd.6HjbMyq8Zuihlwe2NSchml7Gb&l=20220515143130010245004149021F5CA5&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amVuNDo6Zjs6PDMzODczNEApZGg5NmlnZGUzN2U4N2RkZmdzbWppcjRnbXJgLS1kMS1zcy9iYi4yMjYyM2AtXjU0MTI6Yw%3D%3D&vl=&vr=';

type CardProps = {
    content?: any;
}

const Card: React.FC<CardProps> = ({content}) => {
    const {videoUrl, ...rest} = content;
    return (
        <div className={styles['card-container']}>
            <Player videoUrl={content.videoUrl} paused={true}/>
            <ControlsLayout content={rest}/>
        </div>
    )
}

export default Card