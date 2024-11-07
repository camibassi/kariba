import { FaSpeakerDeck } from "react-icons/fa";
import { FaSoundcloud } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";

const Rodape = ({Audio, setFilter, filter}) => {

  return (
  <div style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}> 
   
    <div className="selecaoFiltro">
      <select onChange={(e) => setFilter(e.target.value)} className="botaoRodape">
        <option value="" selected={filter == ""?"selected":""} > Sem filtro</option>
        <option value="#protanopia" selected={filter == "#protanopia"?"selected":""} >Protanopia</option>
        <option value="#deuteranopia" selected={filter == "#deuteranopia"?"selected":""} >Deuteranopia</option>
        <option value="#tritanopia" selected={filter == "#tritanopia"?"selected":""} >Tritanopia</option>
        <option value="#achromatomaly" selected={filter == "#achromatomaly"?"selected":""} >Achromatopsia</option>
      </select>
    </div>

  </div>)
}

export default Rodape;