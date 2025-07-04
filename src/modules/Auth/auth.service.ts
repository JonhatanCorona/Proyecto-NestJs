import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../Users/user.entity";
import * as bcrypt from 'bcrypt'; // <- importante
import { CreateUserDto } from "../Users/CreateUserDto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private JWTServices :JwtService
  ) {}

  async SignUp(user: CreateUserDto) {
    const normalizedEmail = user.email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new BadRequestException("El campo 'email' es requerido");
    }

    const existingUser = await this.userRepository.findOneBy({ email: normalizedEmail });

    if (existingUser) {
      throw new BadRequestException('El correo ya existe');
    }

    const hashedPassword = await bcrypt.hash(user.password_hash, 10);

    const newUser = this.userRepository.create({
      ...user,
      email: normalizedEmail,
      password_hash: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async SignIn (email: string, password_hash: string) {
      const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password_hash) {
    throw new BadRequestException("Credenciales inválidas");
  }

  const existingUser = await this.userRepository.findOneBy({ email: normalizedEmail });

  if (!existingUser) {
    throw new BadRequestException("Credenciales inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password_hash, existingUser.password_hash);

  if (!isPasswordValid) {
    throw new BadRequestException("Credenciales inválidas");
  }
 const userPayload = {
  sub: existingUser.id,
  id: existingUser.id,
  email: existingUser.email,
};

const token = this.JWTServices.sign(userPayload);

return {
  message: "Logueado correctamente",
  access_token: token,
};
}
}
