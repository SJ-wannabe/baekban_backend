import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from './dto/createStore.dto';
import { StoreEntity } from './store.entity';
import { Repository } from 'typeorm';

export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}


  async createStore(createStoreDto: CreateStoreDto) {
    const { businessNumber } = createStoreDto;

    const store = new StoreEntity();
    store.businessNumber = businessNumber;
    await store.save();

    return this.storeRepository.save(store);
  }
}
