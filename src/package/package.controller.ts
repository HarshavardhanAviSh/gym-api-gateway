import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ServiceDTO } from './dto/service.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('/add')
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  //1
  // @Get('')
  // findAll() {
  //   return this.packageService.findAll();
  // }
  
  @Get('allPackages')
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }


  @Get('/generate/default/service')
  async generateDefaultservice(dto:ServiceDTO){
    console.log('inside generate default service');
    return await this.packageService.createDefaultservice(dto);

    // return this.packageService.testPService();
      
  }
  }





