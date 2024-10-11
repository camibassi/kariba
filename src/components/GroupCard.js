import { useRef } from "react";
import { useScroll } from "../hooks/useScroll";
import Card from "./CardComponent";

export default function GroupCard(props) 
{
  const backgroundRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(backgroundRef);

  return (
    <div>
      <h2>{props.name}</h2>
      <div className={props.className || "decks-container"}>
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className={props.classNameDeck + " decks"} ref={backgroundRef}>
          {
            props.itens.map(item => 
              <Card 
                name={item.name} 
                alt={props.alt} 
                item={item.item}
                onClick={item.onClick}
                style={item.styleSrc}
                setImgSrc={item.setImgSrc}
                verso={item.verso}
                onMouseEnter={item.onMouseEnter}
                onMouseLeave={item.onMouseLeave}
                imgSrc={item.imgSrc}>
                  {item.children}
                </Card>)
          }
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
