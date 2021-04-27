import { createContext, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: string;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
