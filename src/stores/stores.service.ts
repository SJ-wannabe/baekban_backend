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
    const { name } = createStoreDto;

    const store = new StoreEntity();
    store.name = name;
    await store.save();

    return this.storeRepository.save(store);
  }
}
