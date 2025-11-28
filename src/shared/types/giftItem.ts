import { IGiftItemJson } from '../interfaces/jsonGift';

export class GiftItem {
  id: number;
  identifier: string;
  title: string;
  name: string | null;
  clue: string;
  found: boolean;

  constructor(
    id: number,
    identifier: string,
    title: string,
    name: string | null,
    clue: string,
    found: boolean
  ) {
    this.id = id;
    this.identifier = identifier;
    this.title = title;
    this.name = name;
    this.clue = clue;
    this.found = found;
  }

  static fromJson(json: any): GiftItem {
    return new GiftItem(
      json.id,
      json.Identifier,
      json.Title,
      json.Name ?? null,
      json.Clue,
      json.Found ?? false
    );
  }

  toJson(): IGiftItemJson {
    return {
      id: this.id,
      Identifier: this.identifier,
      Title: this.title,
      Name: this.name,
      Clue: this.clue,
      Found: this.found,
    };
  }
}
