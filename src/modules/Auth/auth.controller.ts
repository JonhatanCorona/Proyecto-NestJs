import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dtos/UserDto';
import { AuthCredentialDto, GoogleProfileDto, SignInResponseDto, SignupResponseDto } from 'src/dtos/AuthDto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente', type: SignupResponseDto })
  createUser(@Body() user: CreateUserDto): Promise<SignupResponseDto> {
  return this.authService.SignUp(user);
}

  @Post('signIn')
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', type: SignInResponseDto })
  @ApiResponse({ status: 400, description: 'Credenciales inválidas' })
  async SignIn(@Body() user: AuthCredentialDto) {
  return this.authService.SignIn(user.email, user.password_hash);
}

  @Post('google')
  @ApiResponse({ status: 200, type: SignInResponseDto })
  @ApiResponse({ status: 400, description: 'Error de autenticación con Google' })
  async signInWithGoogle(@Body() profile: GoogleProfileDto) {
  return this.authService.signInWithGoogle(profile);
}
}
