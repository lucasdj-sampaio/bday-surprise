export class HeaderData {
  title: string;
  description: string;
  image?: string;

  constructor(title: string, description: string, image?: string) {
    this.title = title;
    this.description = description;
    this.image = image;
  }

  static fromJson(json: any): HeaderData {
    const title = json.data.Title;
    const description = json.data.Description;
    const image = json.data.Picture?.url
      ? `${process.env.STRAPI_BASEURL}${json.data.Picture.url}`
      : undefined;

    return new HeaderData(title, description, image);
  }
}
