import { IMessage } from '../interfaces/message';

export class Introduction {
  title: string;
  ready: string;
  message: IMessage;

  constructor(title: string, ready: string, message: IMessage) {
    this.title = title;
    this.ready = ready;
    this.message = message;
  }

  static fromJson(json: any): Introduction {
    const title = json.data.Title;
    const ready = json.data.Ready;
    const message: IMessage = json.data.Data.message;

    return new Introduction(title, ready, message);
  }
}
