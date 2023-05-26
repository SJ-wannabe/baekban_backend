import { Body, Controller, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { StoreEntity } from './store.entity';
import { ApiTags } from "@nestjs/swagger";

@Controller('stores')
@ApiTags('가게 API')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  createStore(@Body() createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    return this.storesService.createStore(createStoreDto)
  }

}
