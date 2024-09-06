import { useRef } from "react";
import { useScroll } from "../../hooks/scroll";


export default function Music() {
  const musicRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(musicRef);

  return (
    <div>
      <h2>Músicas</h2>
      <div className="decks-container">
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className="decks" id="planos" ref={musicRef}>
            <div className="itemLoja" >
                <h3>Música 1</h3>
                <img src="images/audio_icon.png" alt="Ícone de Áudio" className="audio-icon" />
                <audio src="audio/musica1.mp3" preload="none"></audio>
            </div>

            <div className="itemLoja" >
                <h3>Música 2</h3>
                <img src="images/audio_icon.png" alt="Ícone de Áudio" className="audio-icon" />
                <audio src="audio/musica2.mp3" preload="none"></audio>
            </div>

            <div className="itemLoja" >
                <h3>Música 3</h3>
                <img src="images/audio_icon.png" alt="Ícone de Áudio" className="audio-icon" />
                <audio src="audio/musica3.mp3" preload="none"></audio>
            </div>

            <div className="itemLoja" >
                <h3>Música 4</h3>
                <img src="images/audio_icon.png" alt="Ícone de Áudio" className="audio-icon" />
                <audio src="audio/musica4.mp3" preload="none"></audio>
            </div>


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