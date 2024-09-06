import { useRef } from 'react';

export function useAudio(audioSrc) {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reinicia o áudio para o início
    }
  };

  return { audioRef, playAudio, stopAudio };
}
