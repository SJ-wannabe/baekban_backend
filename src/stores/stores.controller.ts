import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

  //
  // @Get()
  // findAll(): Promise<StoreEntity> {
  //   return this.storesService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<StoreEntity> {
  //   return this.storesService.findOne(+id);
  // }
  //
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() StoreEntity: Partial<StoreEntity>): Promise<StoreEntity> {
  //   return this.storesService.update(+id, StoreEntity);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.storesService.remove(+id);
  // }
// }

}
