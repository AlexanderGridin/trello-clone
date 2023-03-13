export interface IBoardCreateDtoConfig {
  title: string;
  isFavorite: boolean;
  // TODO: remove this. Rank need to be setted on the API side
  rank: number;
  user: string;
}

export class BoardCreateDto {
  public title = "";
  public isFavorite = false;
  // TODO: remove this. Rank need to be setted on the API side
  public rank = -1;
  public user = "";

  constructor(config?: IBoardCreateDtoConfig) {
    if (!config) {
      return;
    }

    const { title, isFavorite, rank, user } = config;

    this.title = title;
    this.isFavorite = isFavorite;
    this.rank = rank;
    this.user = user;
  }
}
