export interface Card {
  id: number;
  name: string;
  power: number;
}

export interface Location {
  id: number;
  name: string;
  isUnlocked: boolean;
}

export interface Player {
  id: number;
  name: string;
  cards: Card[];
}
