import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLogin } from './dto/response-login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return await this.authService.login(loginDto);
  }
}
