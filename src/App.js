import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import useWebSocket from './hooks/useWebSocket';
import Rodape from "./components/Rodape";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeOff } from "react-icons/fa";

export default function App() {
  const { user } = useContext(AuthContext);
  const [background, setBackground] = useState("/images/natureza.png");
  const soundsDefault = [1,2].map(x => `/sounds/default/musica${x}.mp3`);
  const [sounds, setSounds] = useState(soundsDefault);
  const [backgroundCard, setBackgroundCard] = useState('default');
  const [filter, setFilter] = useState('');
  const [soundMuted, setSoundMuted] = useState(false);
  const webSocket = useWebSocket('wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/production/');

  useEffect(() => {
    const root = document.getElementById('root');
    
    if (root) 
      root.style.background = `url(${background})`;

  }, [background]);

  useEffect(()=> {
    const root = document.getElementById('root');
    if (root) 
      if (filter === "") 
        root.style.filter = "";
      else 
        root.style.filter = 'url("'+ filter +'")';
    
  }, [ filter ]);

  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleAudioEnded = () => {
    if (currentTrackIndex < sounds.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      // Se for a última música, volta para o início
      setCurrentTrackIndex(0);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    else
      audioRef.current.stop();
  };

  return (
    <>
    <audio
        ref={audioRef}
        controls
        autoPlay={true}
        style={{display: 'none'}}
        muted={soundMuted}
        src={sounds[currentTrackIndex]}
        onEnded={handleAudioEnded}>
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <div>
        {user || ["/criarConta", "/recuperarSenha"].includes(window.location.pathname) ? (
          <>
          <Outlet context={
            {
              setBackground: setBackground, 
              setBackgroundCard: setBackgroundCard, 
              setSounds: setSounds,
              setFilter : setFilter,
              backgroundCard: backgroundCard,
              background: background,
              filter : filter,
              webSocket: webSocket
            }} />
          <div className="hover" 
            style={{ position: 'fixed', borderRadius: '51%', backgroundColor: '#41616E', padding:'5px',
              bottom: '5px', fontSize: '30px', color: 'white', right: '170px', display: 'flex', gap: '5px' }}>
            {!soundMuted && <FaVolumeHigh onClick={() => {
              setSoundMuted(true);
              handlePlay();
            }} />}
            {soundMuted && <FaVolumeOff onClick={() => {
              setSoundMuted(false);
              handlePlay();
            }}/>}
          </div>
          <Rodape setFilter={setFilter} filter={filter} />
          </>
        ) : (
          <Navigate to="login" />
        )}
      </div>
    </>
  );
}
