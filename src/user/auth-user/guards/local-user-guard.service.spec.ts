import { Test, TestingModule } from '@nestjs/testing';
import { LocalUserGuardService } from './local-user-guard.service';

describe('LocalUserGuardService', () => {
  let service: LocalUserGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalUserGuardService],
    }).compile();

    service = module.get<LocalUserGuardService>(LocalUserGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
