import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceLocalUserService } from './auth-service-local.user.service';

describe('AuthServiceLocalService', () => {
  let service: AuthServiceLocalUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceLocalUserService],
    }).compile();

    service = module.get<AuthServiceLocalUserService>(AuthServiceLocalUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
