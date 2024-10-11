import { useRef } from "react";
import { useScroll } from "../hooks/useScroll";
import Card from "./CardComponent";

export default function GroupCard(props) {
  const backgroundRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(backgroundRef);

  return (
    <div>
      <h2>{props.name}</h2>
      <div className={props.className || "decks-container"}>
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className={props.classNameDeck + " decks"} ref={backgroundRef}>
          {props.itens.map((item, index) => (
            <Card 
              key={index} // Adicione uma chave única
              name={item.name} 
              alt={props.alt} 
              item={item.item}
              onClick={item.onClick}
              style={item.styleSrc}
              verso={item.verso}
              imgSrc={item.imgSrc}
            >
              {item.children}
            </Card>
          ))}
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
