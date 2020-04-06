import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.strategy';

const testUser = { id: '12345', email: 'test@test.com', password: 'testPassword' };

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'), useValue: {
            findOne: () => {
              return { exec: () => Promise.resolve(testUser) };
            }
          }
        },
        {
          provide: LocalStrategy,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        UsersService,
        AuthService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {

    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should return valid value with valid username and password', async () => {
      const result = await service.validateUser('test@test.com', 'testPassword');

      expect(result).toStrictEqual({ userId: '12345', username: 'test@test.com' });
    });

    it('should return "null with invalid password', async () => {
      const result = await service.validateUser('test@test.com', 'wrongTestPassword');

      expect(result).toBeNull();
    });
  });
});
