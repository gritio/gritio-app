import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() body: { email: string; password: string; name?: string }) {
    const user = await this.usersService.createUser(
      body.email,
      body.password,
      body.name,
    );

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { 
    email: string; 
    password: string; 
    name: string;
    phone?: string;
    dob?: string;
  }) {
    const user = await this.usersService.createUser(
      body.email,
      body.password,
      body.name,
      body.phone,
      body.dob,
    );

    return {
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() body: { token: string }) {
    await this.usersService.verifyEmail(body.token);
    return {
      message: 'Email verified successfully. You can now login.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.usersService.validateCredentials(
      credentials.email,
      credentials.password,
    );

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
