export class FoundGift {
  name: string;
  image?: string;
  nextIdentifier?: string;

  constructor(name: string, nextIdentifier?: string, image?: string) {
    this.name = name;
    this.image = image;
    this.nextIdentifier = nextIdentifier;
  }

  static fromJson(json: any): FoundGift {
    const name = json.name;
    const image = json.image
      ? `${process.env.STRAPI_BASEURL}${json.image}`
      : undefined;
    const nextIdentifier = json.nextIdentifier;

    return new FoundGift(name, nextIdentifier, image);
  }
}
