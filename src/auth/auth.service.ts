import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserEntity } from './entities/user.entity';
import {
    AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(private firebaseService: FirebaseService, private prisma: PrismaService) {}

  public async login(email: string, password: string): Promise<Omit<UserEntity,'password'>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        password,
      );

      if (userCredential) {
        const data = await this.prisma.user.findUnique({ where: { email } });
        delete data.password;
        return data;
      };

    } catch (error: unknown) {
      const firebaseAuthError = error as AuthError;

      console.log(`[FIREBASE AUTH ERROR CODE]: ${firebaseAuthError.code}`);
  
      if (firebaseAuthError.code === 'auth/wrong-password') {
        throw new HttpException(
          'Incorrect email or password.',
          HttpStatus.FORBIDDEN,
        );
      }
      if (firebaseAuthError.code === 'auth/missing-email') {
        throw new HttpException(
          'Missing email.',
          HttpStatus.BAD_REQUEST,
        );
      }
      else {
        throw new HttpException(
          `Internal server error (${firebaseAuthError.code}).`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public async register(body: Omit<UserEntity, 'id'>): Promise<Omit<UserEntity,'password'>> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth,
        body.email,
        body.password,
      );
    
      if (userCredential) {
          const createUserDto: CreateUserDto = body;
          const data = await this.prisma.user.create({ data: createUserDto });
          delete data.password;
          return data;
      };

    } catch (error: unknown) {
      const firebaseAuthError = error as AuthError;
      
      console.log(`[FIREBASE AUTH ERROR CODE]: ${firebaseAuthError.code}`);

      if (firebaseAuthError.code === 'auth/email-already-in-use') {
        throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
      }
      if (firebaseAuthError.code === 'auth/missing-email') {
        throw new HttpException(
          'Missing email.',
          HttpStatus.BAD_REQUEST,
        );
      }
      else {
          throw new HttpException(
          `Internal server error (${firebaseAuthError.code}).`,
          HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
