import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from '../assets/assets'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });
    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
      await setTrack(songsData[id]);
      await audioRef.current.play();
      setPlayStatus(true);
    }

    const previous = async (id) => {
        if (track.id>0) {
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async (id) => {
        if (track.id<songsData.length-1) {
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    // Use effect to update time
    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;

                // Set the width of the seek bar as a percentage of the total duration
                const seekBarWidth = (currentTime / duration) * 100;
                seekBar.current.style.width = `${seekBarWidth}%`;

                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    },
                });
            }
        };

        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
