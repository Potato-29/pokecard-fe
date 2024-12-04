"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Player } from "../../components/Player/Player";
import { Location } from "../../components/Location/Location";
import {
  Player as PlayerType,
  Location as LocationType,
  Card as CardType,
} from "../../types/game";

const initialPlayers: PlayerType[] = [
  {
    id: 1,
    name: "Player 1",
    cards: [
      { id: 1, name: "Card 1", power: 3 },
      { id: 2, name: "Card 2", power: 5 },
      { id: 3, name: "Card 3", power: 2 },
      { id: 4, name: "Card 4", power: 6 },
    ],
  },
  {
    id: 2,
    name: "Player 2",
    cards: [
      { id: 4, name: "Card 4", power: 4 },
      { id: 5, name: "Card 5", power: 1 },
      { id: 6, name: "Card 6", power: 6 },
      { id: 7, name: "Card 7", power: 3 },
    ],
  },
];

const initialLocations: LocationType[] = [
  { id: 1, name: "Location 1", isUnlocked: true },
  { id: 2, name: "Location 2", isUnlocked: true },
  { id: 3, name: "Location 3", isUnlocked: true },
];

export function GameBoard() {
  const [players, setPlayers] = useState<PlayerType[]>(initialPlayers);
  const [locations] = useState<LocationType[]>(initialLocations);
  const [locationCards, setLocationCards] = useState<{
    [key: number]: { [key: number]: CardType[] };
  }>({});
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const handlePlayCard = (
    playerId: number,
    card: CardType,
    locationId: number
  ) => {
    if (playerId !== currentPlayer) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, cards: player.cards.filter((c) => c.id !== card.id) }
          : player
      )
    );

    setLocationCards((prev) => ({
      ...prev,
      [locationId]: {
        ...prev[locationId],
        [playerId]: [...(prev[locationId]?.[playerId] || []), card],
      },
    }));

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-between p-4">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
          <Player player={players[1]} isCurrentPlayer={currentPlayer === 2} />
          <div className="flex justify-center gap-4 my-4">
            {locations.map((location) => (
              <Location
                key={location.id}
                location={location}
                playerCards={locationCards[location.id]?.[players[0].id] || []}
                opponentCards={
                  locationCards[location.id]?.[players[1].id] || []
                }
                onPlayCard={(card) =>
                  handlePlayCard(players[0].id, card, location.id)
                }
                currentPlayer={currentPlayer}
              />
            ))}
          </div>
          <Player player={players[0]} isCurrentPlayer={currentPlayer === 1} />
        </div>
      </div>
    </DndProvider>
  );
}
