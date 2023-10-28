export interface SpecialMoveDto {
    id: number;
    userId: string;
    spName: string;
    furigana: string;
    heading: string;
    description: string;
    imageName: string;
    registedTime: string;
    battleCount: number;
    winCount: number;
    loseCount: number;
  }
  
  export interface SpecialMoveDeckDto {
    id: number;
    userId: string;
    deckId: number;
    spName: string;
    furigana: string;
    heading: string;
    description: string;
    imageName: string;
    registedTime: string;
    battleCount: number;
    winCount: number;
    loseCount: number;
  }
  