import { IGiftContentJson } from '../interfaces/jsonGift';
import { GiftSection } from './giftSection';

export class GiftContent {
  title: string;
  sections: GiftSection[];

  constructor(title: string, sections: GiftSection[]) {
    this.title = title;
    this.sections = sections;
  }

  static fromJson(json: any): GiftContent {
    const raw = json?.data;
    if (!raw) throw new Error('Invalid content JSON');

    const title = raw.Title;
    const sections = (raw.Section || []).map((s: any) =>
      GiftSection.fromJson(s)
    );

    return new GiftContent(title, sections);
  }

  toJson(): IGiftContentJson {
    return {
      data: {
        Title: this.title,
        Section: this.sections.map(s => s.toJson()),
      },
    };
  }
}
