export interface IGiftItem {
  id: number;
  identifier: string;
  title: string;
  name: string | null;
  tip: string;
  found: boolean;
}

export interface IGiftSection {
  id: number;
  name: string;
  title: string;
  description: string | null;
  gifts: IGiftItem[];
}

export interface IGiftContent {
  id: number;
  title: string;
  sections: IGiftSection[];
}
