import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseUserAuthService } from './database-auth.service';

describe('DatabaseAuthService', () => {
  let service: DatabaseUserAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseUserAuthService],
    }).compile();

    service = module.get<DatabaseUserAuthService>(DatabaseUserAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
