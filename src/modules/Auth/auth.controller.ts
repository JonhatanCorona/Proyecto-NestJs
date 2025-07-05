import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { AuthCredentialDto } from 'src/dtos/AuthCredentialDto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.SignUp(user);
  }

  @Post('signIn')
  async SignIn(@Body()  user: AuthCredentialDto) {
    return this.authService.SignIn(user.email, user.password_hash)
  }

  @Post('google')
  async signInWithGoogle(@Body() profile: { sub: string; email: string; name: string }) {
    return this.authService.signInWithGoogle(profile);
  }
}
