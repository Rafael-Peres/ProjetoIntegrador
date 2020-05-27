import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  enderecoDoServidor = 'http://93.188.161.223:9000/user';

  constructor(private http: HttpClient) { }

  obterTodos() {
    return this.http.get(this.enderecoDoServidor);
  }
  obterPorId(id) {
    return this.http.get(this.enderecoDoServidor + '/' + id);
  }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post(this.enderecoDoServidor, usuario);
  }
}