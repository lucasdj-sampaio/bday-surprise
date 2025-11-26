export class GiftItem {
  identifier: string;
  title: string;
  name: string | null;
  tip: string;
  found: boolean;

  constructor(
    identifier: string,
    title: string,
    name: string | null,
    tip: string,
    found: boolean
  ) {
    this.identifier = identifier;
    this.title = title;
    this.name = name;
    this.tip = tip;
    this.found = found;
  }

  static fromJson(json: any): GiftItem {
    return new GiftItem(
      json.Identifier,
      json.Title,
      json.Name ?? null,
      json.Tip,
      json.Found ?? false
    );
  }
}
