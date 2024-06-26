import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('registrar')
  async register(@Body() novoUsuario: { username: string, password: string }) {
    return this.usuarioService.create(novoUsuario.username, novoUsuario.password);
  }

  @Post('login')
  async login(@Body() usuario: {username: string, password: string}){
    return this.usuarioService.login(usuario);
  }
}
