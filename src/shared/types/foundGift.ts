import { imagePathValidation } from '@/util';

export class FoundGift {
  name: string;
  image?: string;
  nextId?: number;

  constructor(name: string, nextId?: number, image?: string) {
    this.name = name;
    this.image = image;
    this.nextId = nextId;
  }

  static fromJson(json: any): FoundGift {
    const name = json.name;
    const image = imagePathValidation(json.image);
    const nextId = json.nextId;

    return new FoundGift(name, nextId, image);
  }
}
