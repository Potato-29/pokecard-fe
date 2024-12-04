import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { Location as LocationType, Card as CardType } from "../../types/game";
import { Card } from "../Card/Card";

interface LocationProps {
  location: LocationType;
  playerCards: CardType[];
  opponentCards: CardType[];
  onPlayCard: (card: CardType, locationId: number) => void;
  currentPlayer: number;
}

export function Location({
  location,
  playerCards,
  opponentCards,
  onPlayCard,
  currentPlayer,
}: LocationProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item: CardType) => onPlayCard(item, location.id),
    canDrop: () => currentPlayer === 1,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-44 h-28 bg-yellow-100 border-2 border-yellow-300 rounded-lg flex flex-wrap justify-center items-center p-1 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {opponentCards.map((card) => (
          <Card key={`opponent-${card.id}`} card={card} isPlayed={true} />
        ))}
      </motion.div>
      <motion.div
        className="w-44 h-48 bg-blue-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-2 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold mb-2">{location.name}</h2>
        {!location.isUnlocked && <p className="text-xs text-center">Locked</p>}
      </motion.div>
      <motion.div
        ref={drop}
        className={`w-44 h-28 bg-yellow-100 border-2 ${
          isOver ? "border-green-500" : "border-yellow-300"
        } rounded-lg flex flex-wrap justify-center items-center p-1`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {playerCards.map((card) => (
          <Card key={`player-${card.id}`} card={card} isPlayed={true} />
        ))}
      </motion.div>
    </div>
  );
}
