import { useOutletContext } from "react-router-dom";

const Rodape = (props) => {
  const context = useOutletContext();
  const filter = ( context ) ? context.filter : "" ;

  function changeFilter(f) {
    // Verifica se context existe antes de chamar setFilter
    if (context && context.setFilter) {
      // Seta o filtro dentro do context
      context.setFilter(f);
    }
  }

  return (<div style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}> 
    <div className="selecaoFiltro">
      <select onChange={(e) => changeFilter(e.target.value)} className="botaoRodape">
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