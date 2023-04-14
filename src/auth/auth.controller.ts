import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { SignUpDTO } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}


  @Get('all')
  getAll(email:string) {
    this.authSvc.getAllUsers(email);
    this.authSvc.getAllGyms();
    
  }

  @Get('uuid')
  getUUID() {
    return this.authSvc.getUUID();
  }


  @UseGuards(AuthGuard('local') )
  @Post('/login')   //3
  async login(@Body() body: LoginDTO, @Request() req) {
    // console.log("Req-",req);
    return await this.authSvc.login(req.user);
    //return req.user;
  }

  @Post('/signup')  //1  Wharting
  async signup(@Body() body: SignUpDTO) {
    return await this.authSvc.signup(body);
  }

  @Post('/validateuser')  //2   
  async signIn(@Body() body: LoginDTO) {
    return await this.authSvc.validateUser(body.email, body.password);
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }



  resetPassword() {}

  logout() {}
}
