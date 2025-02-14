import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import { LuSunSnow } from "react-icons/lu";
import { PiFlowerTulipBold } from "react-icons/pi";
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const SeasonalWear = () => {
  const videoRef = useRef(null);
  const { selectedSeason } = useContext(ShopContext);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const seasonVideos = {
    Winter: "https://cdn.pixabay.com/video/2023/11/20/189876-886572817_tiny.mp4",
    Summer: "https://cdn.pixabay.com/video/2023/12/05/192138-891702233_large.mp4",
    Autumn: "https://media.istockphoto.com/id/1793719506/video/walking-happily-with-my-lover.mp4?s=mp4-640x640-is&k=20&c=lRLzhBrDyZRzLmmz8Ofqk264KjMWhsWVYWn-OJOXKwA=",
    Spring: "https://cdn.pixabay.com/video/2017/02/03/7650-202459217_large.mp4"
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [selectedSeason]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreenToggle = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const x = useMotionValue(-100);
  const color = useTransform(x, [-100, 0, 100], ["black", "white", "black"]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <LuSunSnow className="w-6 h-6 text-amber-500" />
        <Title text1={'Seasonal'} text2={'Wear'} />
        <PiFlowerTulipBold className="w-6 h-6 text-pink-500" />
      </div>

      <div className="group relative w-full h-64 sm:h-80 md:h-[350px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-lg">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          key={selectedSeason}
        >
          <source src={seasonVideos[selectedSeason] || seasonVideos.Winter} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.div
          className="absolute top-1/2 left-0 w-full text-5xl md:text-6xl lg:text-7xl px-4 py-2 font-bold text-center text-shadow-lg"
          style={{
            WebkitTextStroke: "2px white",
            textStroke: "2px white",
            color: "transparent",
          }}
          initial={{ x: "-100%", opacity: 0, filter: "blur(10px)" }}
          animate={{ x: "100%", opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
            opacity: { duration: 2 },
            filter: { duration: 2 },
          }}
        >
          {selectedSeason} Collection
        </motion.div>

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
          </div>
          <div className="absolute top-4 right-4 flex space-x-3">
            <button
              onClick={handleMuteToggle}
              className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <button
              onClick={handleFullscreenToggle}
              className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <FaExpand size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalWear;
