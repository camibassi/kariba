import { useRef } from "react";
import { useScroll } from "../../hooks/scroll";
import ItemLoja from "../Membro/ItemLoja";


export default function Music() {
  const musicRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(musicRef);

  return (
    <div>
      <h2>Músicas</h2>
      <div className="decks-container">
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className="decks" id="planos" ref={musicRef}>
            {[1, 2, 3, 4].map(index => 
                <ItemLoja name={`Música ${index}`} 
                  imgSrc="images/audio_icon.png" 
                  audioSrc={`audio/musica${index}.mp3`}>
                    <audio src={`audio/musica${index}.mp3`} preload="none"></audio>
                  </ItemLoja>
              )}
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}

/*
import React from 'react';
import { useAudio } from '../../hooks/useAudio';

function Music() {
  const { audioRef, playAudio, stopAudio } = useAudio('audio/deserto.mp3'); // Caminho para o áudio

  return (
    <div className="itemLoja">
      <h3>Deserto</h3>
      <i
        className="fas fa-volume-up audio-icon"
        onMouseEnter={playAudio}
        onMouseLeave={stopAudio}
      ></i> { Ícone de áudio }
      <audio ref={audioRef} preload="none"></audio> {/* O áudio está referenciado aqui }
    </div>
  );
}

export default Music;
*/