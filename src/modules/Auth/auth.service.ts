import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../Users/user.entity";
import * as bcrypt from 'bcrypt'; // <- importante
import { CreateUserDto } from "../../dtos/CreateUserDto";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./role.enum";
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

  if (existingUser.status_activo === false) {
    throw new BadRequestException("Cuenta deshabilitada. Contacte con soporte.");
  }

 const userPayload = {
  id: existingUser.id,
  name: existingUser.name,
  email: existingUser.email,
  phone: existingUser.telefono,
  role: [ existingUser.es_admin ? Role.Admin : Role.User ]
};
const hasPassword = !!(existingUser.password_hash && existingUser.password_hash.trim() !== '');
const token = this.JWTServices.sign(userPayload);

return {
  message: "Logueado correctamente",
  access_token: token,
  password: hasPassword,
  user: userPayload
};
}

async signInWithGoogle(profile: { sub: string; email: string; name: string; image?: string }) {
  const normalizedEmail = profile.email.trim().toLowerCase();

  let existingUser = await this.userRepository.findOneBy({ email: normalizedEmail });

  let wasCreated = false;

  if (!existingUser) {
    const newUser = this.userRepository.create({
      name: profile.name,
      email: normalizedEmail,
      google_id: profile.sub,
      password_hash: '',
      telefono: '',
      es_admin: false,
      image: profile.image ?? '', // <- Usa valor vacío si no viene
    });

    existingUser = await this.userRepository.save(newUser);
    wasCreated = true;
  } else {
    if (existingUser.status_activo === false) {
      throw new BadRequestException("Cuenta deshabilitada. Contacte con soporte.");
    }

    if (!existingUser.google_id) {
      existingUser.google_id = profile.sub;
      await this.userRepository.save(existingUser);
    }
  }

  const userPayload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    phone: existingUser.telefono,
    image: existingUser.image,
    role: [existingUser.es_admin ? Role.Admin : Role.User],
  };

  const hasPassword = !!(existingUser.password_hash && existingUser.password_hash.trim() !== '');
  const token = this.JWTServices.sign(userPayload);

  return {
    message: wasCreated
      ? 'Usuario creado y autenticado con Google'
      : 'Usuario existente autenticado con Google',
    access_token: token,
    password: hasPassword,
    user: userPayload,
  };
}
}