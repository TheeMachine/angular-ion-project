import { Restaurant } from './restaurant';

export interface Response {
  response?: Restaurant[];
  error?: Error;
}

interface Error {
  code: string;
  desc: string;
}
