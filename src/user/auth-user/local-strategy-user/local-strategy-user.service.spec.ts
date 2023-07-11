import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategyUserService } from './local-strategy-user.service';

describe('LocalStrategyUserService', () => {
  let service: LocalStrategyUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategyUserService],
    }).compile();

    service = module.get<LocalStrategyUserService>(LocalStrategyUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
