import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './dto/usuarios.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>, 
    private readonly jwtService: JwtService
  ) {}

  async create(username: string, password: string): Promise<Usuario> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = new this.usuarioModel({ username, passwordHashed: hashedPassword, password });
    return createdUser.save();
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    if(user && bcrypt.compareSync(pass, user.password)){
        const { password, ...result} = user;
        return result;
    }
    return null;
}

  async findOne(username: string): Promise<Usuario> {
    return this.usuarioModel.findOne({ username }).exec();
  }

  async login(user: { username: string, password: string}) {
    const usuario = await this.findOne(user.username);
    if (usuario && usuario.password === user.password) {
        const payload = { username: usuario.username, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    return null;
}
}
