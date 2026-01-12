import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(auth0Id: string, email: string, name?: string) {
    let user = await this.prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          auth0Id,
          email,
          name: name || email.split('@')[0],
        },
      });
    }

    return user;
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        goals: true,
      },
    });
  }

  async updateUser(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async createUser(
    email: string,
    password: string,
    name?: string,
    phone?: string,
    dob?: string,
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        phone: phone || null,
        dob: dob ? new Date(dob) : null,
        emailVerified: false,
        emailVerificationToken,
        emailVerificationExpires,
      },
    });
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findUnique({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      throw new BadRequestException('Verification token has expired');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });
  }
}
