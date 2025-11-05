import React, { useState } from 'react';
import Image from 'next/legacy/image';
import YouTube from 'react-youtube';

const PodcastCard = ({ podcast }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {isPlaying ? (
        <YouTube
          videoId={podcast.youtube_id}
          className="w-full h-full"
          opts={{
            height: '224',
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      ) : (
        <div className="relative w-full pb-56 cursor-pointer" onClick={handlePlayVideo}>
          <Image
            src={`https://i.ytimg.com/vi/${podcast.youtube_id}/maxresdefault.jpg`}
            alt={podcast.title}
            layout="fill"
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <div className="flex flex-col items-start mt-4">
        <h3 className="text-lg font-semibold">{podcast.title}</h3>
        <p className="text-gray-600">Social Bevy</p>
      </div>
    </div>
  );
};

export default PodcastCard;
