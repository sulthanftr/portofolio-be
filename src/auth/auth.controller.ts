import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('login')
  public login(@Body() body: Pick<UserEntity, 'email' | 'password'> ) {
    return this.authService.login(body.email, body.password)
  }

  @Post('register')
  public register(@Body() body: Omit<UserEntity, 'id'>) {
    return this.authService.register(body)
  }
}
