import React, {useEffect, useRef, useState, VideoHTMLAttributes} from 'react'
import ReactPlayer from 'react-player/lazy';

import styles from './Player.module.css';

type PlayerProps = {
    videoUrl: string;
    paused: boolean;
};

// const _videoUrl = 'https://v16-webapp.tiktok.com/a173368b3cb264a1096a3f15f8ba616d/6281632a/video/tos/alisg/tos-alisg-pve-0037c001/4ceae21c2f6b46a2bc80cb9f6ee7032e/?a=1988&br=1072&bt=536&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=eXd.6HjbMyq8Zuihlwe2NSchml7Gb&l=20220515143130010245004149021F5CA5&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amVuNDo6Zjs6PDMzODczNEApZGg5NmlnZGUzN2U4N2RkZmdzbWppcjRnbXJgLS1kMS1zcy9iYi4yMjYyM2AtXjU0MTI6Yw%3D%3D&vl=&vr=';
const Player: React.FC<PlayerProps> = ({
    videoUrl,
    paused,
}) => {
    const [showChild, setShowChild] = useState(false);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    console.log(playing);

    return (
        <div
            className={styles.video}
            onClick={() => setPlaying(!playing)}
        >
            <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls={false}
                playing={playing}
                loop
                muted
                config={{
                    youtube: {
                        playerVars: {
                            rel: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            showinfo: 0,
                            origin: window.location.origin,
                            enablejsapi: 1,
                            autoplay: true,
                            // start: 50
                        },
                    },
                }}
            />
        </div>
    );

}

export default Player