export class Counter {
  title: string;
  birthday: string;

  constructor(title: string, birthday: string) {
    this.title = title;
    this.birthday = birthday;
  }

  static fromJson(json: any): Counter {
    const title = json.data.Title;
    const birthday = json.data.Birthday;

    return new Counter(title, birthday);
  }
}
