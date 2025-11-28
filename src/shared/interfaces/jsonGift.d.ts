export interface IGiftContentJson {
  data: {
    Title: string;
    Section: any[];
  };
}

export interface IGiftSectionJson {
  Name: string;
  Title: string;
  Description: string | null;
  Available: string;
  Gifts: any[];
}

export interface IGiftItemJson {
  id: number;
  Identifier: string;
  Title: string;
  Name: string | null;
  Clue: string;
  Found: boolean;
}
