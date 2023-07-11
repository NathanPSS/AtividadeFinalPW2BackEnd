import { Test, TestingModule } from '@nestjs/testing';
import { SerializableUserService } from './serializable.service';

describe('SerializableService', () => {
  let service: SerializableUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerializableUserService],
    }).compile();

    service = module.get<SerializableUserService>(SerializableUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
