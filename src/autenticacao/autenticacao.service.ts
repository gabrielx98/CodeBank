import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
    export class AutenticacaoService {
        constructor(
            private readonly usuariosService: UsuarioService,
            private readonly jwtService: JwtService
        ) {}

        async validateUser(username: string, pass: string): Promise<any> {
            const user = await this.usuariosService.findOne(username);
            if(user && bcrypt.compareSync(pass, user.password)){
                const { password, ...result} = user;
                return result;
            }
            return null;
        }

        async login(user: { username: string, password: string}) {
            const usuario = await this.usuariosService.findOne(user.username);
            if (usuario && usuario.password === user.password) {
                const payload = { username: usuario.username, sub: usuario.id };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            return null;
        }

        
    }
