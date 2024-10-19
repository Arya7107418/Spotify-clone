import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const { track, seekBg, seekBar, playStatus, play, pause, time,previous,next} = useContext(PlayerContext);

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='flex flex-col gap-1 items-center m-auto'>
        <div className='flex gap-4'>
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="Previous" />
          {playStatus ? (
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="Pause" />
          ) : (
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="Play" />
          )}
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="Next" />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="Loop" />
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}</p>
          <div ref={seekBg} className='bg-gray-300 w-[60vw] max-w-[500px] rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt="Plays" />
        <img className='w-4' src={assets.mic_icon} alt="Mic" />
        <img className='w-4' src={assets.queue_icon} alt="Queue" />
        <img className='w-4' src={assets.speaker_icon} alt="Speaker" />
        <img className='w-4' src={assets.volume_icon} alt="Volume" />
        <div className='w-20 bg-slate-50 rounded h-1'></div>
        <img className='w-4' src={assets.mini_player_icon} alt="Mini Player" />
        <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
