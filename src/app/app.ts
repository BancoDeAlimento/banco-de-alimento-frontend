import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SemInternet } from './compartilhado/componentes/sem-internet';

@Component({
  imports: [RouterOutlet, SemInternet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
