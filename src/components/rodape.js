const Rodape = (props) => {
  function changeFilter(f) {
    let root = document.getElementById("root");
    if (f === "") root.style = "";
    else root.style = "filter: url(" + f + ");";
  }

  return (<div style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}>
    <button className="botaoRodape" onClick={() => changeFilter('')}>Normal</button>
    <button className="botaoRodape" onClick={() => changeFilter("#protanopia")}>Protanopia</button>
    <button className="botaoRodape" onClick={() => changeFilter("#deuteranopia")}>Deuteranopia</button>
    <button className="botaoRodape" onClick={() => changeFilter("#tritanopia")}>Tritanopia</button>
    <button className="botaoRodape" onClick={() => changeFilter("#achromatomaly")}>Achromatopsia</button>
  </div>)
}

export default Rodape;