import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@exemple.com',
      password: '123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Maria',
      email: 'jhonMaria@exemple.com',
      password: '456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Logged',
      email: 'jhonLogged@exemple.com',
      password: '789',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
