export enum AnimationTheme {
  DRIFT = 'drift',
  FADE_UP = 'fade_up',
  SHIMMER = 'shimmer',
  TYPEWRITER = 'typewriter'
}

export interface Quote {
  id?: number;
  text: string;
  author: string;
  createdAt: number;
  theme: AnimationTheme;
}

export type QuoteFormData = Omit<Quote, 'id' | 'createdAt'>;