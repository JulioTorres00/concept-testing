export interface RickModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}

export interface RickObject {
  results: RickModel[];
}
