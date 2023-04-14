import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { FileExtensionValidator } from './validators/fileextn.validator';
import { FileHeaderValidator } from './validators/fileheader.validator';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post('/add')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get('/all')
  async findAll() {
    return await this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return await this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.memberService.remove(id);
  }

  // @Post('/imageupload')
  // @UseInterceptors(FileInterceptor('image', {
  //   dest: '/images'
  // }))
  // uploadPics(@UploadedFile(new ParseFilePipe({
  //   validators: [
  //     new FileTypeValidator({
  //       fileType: 'image/png'
  //     }),
  //     new MaxFileSizeValidator({
  //       maxSize: 2000000
  //     }),


  //   ]
  // })) file: Express.Multer.File) {
  //   console.log(file);
  //   return "image uploaded successfully"
  // }

  @Post('/bulkupload')
  @UseInterceptors(FileInterceptor('file', {
    dest: './bulkuploadata',
  }))
  uploadMembers(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 2000000
      }),
      new FileExtensionValidator({
        extensions: ['xls', 'xlsx', 'csv']
      }),
      new FileHeaderValidator({
        headers:['firstName','lastName','email','mobileNo']
      })
    ]
  })) file: Express.Multer.File) {
    console.log(file);
    //todo: service invocation to parse file content and store in database.

    return "file uploaded successfully";

  }
}
