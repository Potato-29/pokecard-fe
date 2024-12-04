import { Player as PlayerType } from "../../types/game";
import { Card } from "../Card/Card";

interface PlayerProps {
  player: PlayerType;
  isCurrentPlayer: boolean;
}

export function Player({ player, isCurrentPlayer }: PlayerProps) {
  return (
    <div className="w-full p-2 rounded-lg">
      <h2 className="text-sm text-center font-bold mb-1">{player.name}</h2>
      <div className="flex justify-center">
        {player.cards.map((card, index) => (
          <div
            key={card.id}
            className="relative"
            style={{
              zIndex: index,
            }}
          >
            <Card card={card} isPlayed={false} canDrag={isCurrentPlayer} />
          </div>
        ))}
      </div>
    </div>
  );
}
