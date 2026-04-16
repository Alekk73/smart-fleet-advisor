import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { IJwtPayload } from '../../common/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const mailInUse = await this.usersService.findByEmail(registerDto.email);
    if (mailInUse !== null) throw new BadRequestException('Mail in used');

    const passwordHash = bcrypt.hashSync(
      registerDto.password,
      Number(process.env.HASH_SALT),
    );

    const createUser = this.usersService.create({
      ...registerDto,
      password_hash: passwordHash,
    });
    if (!createUser) throw new BadRequestException('Error creating user');

    return { message: 'User creating successfully' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = bcrypt.compareSync(loginDto.password, user.password_hash);
    if (!isMatch) throw new UnauthorizedException('Incorrect data');

    const payload: IJwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { message: 'Login successfully', accessToken };
  }
}
