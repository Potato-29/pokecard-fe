import { useDrag } from "react-dnd";
import { Card as CardType } from "../../types/game";

interface CardProps {
  card: CardType;
  isPlayed?: boolean;
  canDrag?: boolean;
}

export function Card({ card, isPlayed = false, canDrag = true }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { ...card, id: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !isPlayed && canDrag,
  }));

  const cardClass = isPlayed ? "w-8 h-12 text-xs" : "w-14 h-20 text-sm";

  return (
    <div
      ref={drag}
      className={`${cardClass} bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer m-1 transition-transform ${
        !isPlayed && "hover:scale-105 active:scale-95"
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-bold truncate w-full text-center">{card.name}</h3>
      <p className="font-bold">{card.power}</p>
    </div>
  );
}
