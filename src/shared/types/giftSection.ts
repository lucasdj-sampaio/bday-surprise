import { IGiftSectionJson } from '../interfaces/jsonGift';
import { GiftItem } from './giftItem';

export class GiftSection {
  name: string;
  title: string;
  description: string | null;
  available: string;
  gifts: GiftItem[];

  constructor(
    name: string,
    title: string,
    description: string | null,
    available: string,
    gifts: GiftItem[]
  ) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.available = available;
    this.gifts = gifts;
  }

  get unlockedGiftsCount(): number {
    return this.gifts.filter(g => g.found).length;
  }

  get progress(): number {
    return (this.unlockedGiftsCount / this.gifts.length) * 100;
  }

  get isAvailable(): boolean {
    return Date.now() >= new Date(this.available).getTime();
  }

  static fromJson(json: any): GiftSection {
    const name = json.Name;
    const title = json.Title;
    const description = json.Description ?? null;
    const available = json.Available;

    const gifts = (json.Gifts || []).map((g: any) => GiftItem.fromJson(g));

    return new GiftSection(name, title, description, available, gifts);
  }

  toJson(): IGiftSectionJson {
    return {
      Name: this.name,
      Title: this.title,
      Description: this.description,
      Available: this.available,
      Gifts: this.gifts.map(g => g.toJson()),
    };
  }
}
