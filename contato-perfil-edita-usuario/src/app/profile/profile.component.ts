import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuarios: Usuario = new Usuario;
  usuario: Usuario;
  choose: boolean = false;

  constructor(private route: ActivatedRoute,
    private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.obterUsuarioPorId(this.route.snapshot.params['id']);

    localStorage.setItem('escolha', String(this.choose))
    this.editar();
  }

  obterUsuarioPorId(id: number) {
    this.usuarioService.obterPorId(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  editar() {
    let propFieldset = document.querySelector("fieldset");
    let propEdit = <HTMLInputElement>document.getElementById("save");
    let choose = localStorage.getItem('escolha')

    if (choose == 'true') {
      propFieldset.disabled = false;
      propEdit.disabled = false;
      localStorage.setItem('escolha', 'false');
    } else {
      propFieldset.disabled = true;
      propEdit.disabled = true;
      localStorage.setItem('escolha', 'true');
    }

  }

  salvar() {
    this.usuarioService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(['/home'])
      location.assign('/home')
    })
  }

}