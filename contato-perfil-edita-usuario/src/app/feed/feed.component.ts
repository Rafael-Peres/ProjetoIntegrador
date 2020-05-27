import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  listaPostagens: Postagem[]

  postagem: Postagem = new Postagem

  alerta: boolean = false

  titulo: string

  numeroDeLikes: number = 0;

  constructor(private postagemService: PostagemService) { }

  ngOnInit() {

    this.findallPostagens()

    window.scroll(0, 0)

    let item: string = localStorage.getItem('delOk')

    if (item == "true") {
      this.alerta = true
      localStorage.clear()

      setTimeout(() => {
        location.assign('/feed')
      }, 2000)


    }
  }

  findallPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicar() {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      location.assign('/feed')
    })
  }

  pesquisarPorTitulo() {
    this.postagemService.findByTitulo(this.titulo).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  likeclick() {
    this.numeroDeLikes++;
  }

}
