// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with a repeated email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@exemple.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
