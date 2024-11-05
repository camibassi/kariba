import { useOutletContext } from "react-router-dom";

const Rodape = (props) => {
  const context = useOutletContext();

  function changeFilter(f) {
    // Seta o filtro dentro do context
    context.setFilter(f);
  }

  return (<div style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}> 
    <div className="selecaoFiltro">
        <select onChange={(e) => changeFilter(e.target.value)} className="botaoRodape">
          <option value="" selected={context.filter == ""?"selected":""} > Sem filtro</option>
          <option value="#protanopia" selected={context.filter == "#protanopia"?"selected":""} >Protanopia</option>
          <option value="#deuteranopia" selected={context.filter == "#deuteranopia"?"selected":""} >Deuteranopia</option>
          <option value="#tritanopia" selected={context.filter == "#tritanopia"?"selected":""} >Tritanopia</option>
          <option value="#achromatomaly" selected={context.filter == "#achromatomaly"?"selected":""} >Achromatopsia</option>
        </select>
    </div>

  </div>)
}

export default Rodape;