import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({image,name,desc,id}) => {

  const {playWithId} = useContext(PlayerContext)

  return (
  <div onClick={()=>playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
   <img className='rounded' src={image} alt=