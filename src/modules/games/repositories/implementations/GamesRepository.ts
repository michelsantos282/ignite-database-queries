import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('game')
      .where('LOWER(title) like :title', { title: `%${param.toLowerCase()}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const users = await this.repository.createQueryBuilder()
      .select('users')
      .from(User, 'users')
      .leftJoinAndSelect('users.games', 'games')
      .where('games.id = :id', { id: id })
      .getMany();

    return users;

  }
}
