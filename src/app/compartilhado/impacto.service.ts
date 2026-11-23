import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Impacto {
  totalKg: number;
}

/** Busca o total de alimentos movimentados (GET /api/impacto, do back-end). */
@Injectable({ providedIn: 'root' })
export class ImpactoService {
  private readonly http = inject(HttpClient);

  // TODO: mover o endereço da API para um arquivo de ambiente
  private readonly url = 'http://localhost:8080/api/impacto';

  buscar(): Observable<Impacto> {
    return this.http.get<Impacto>(this.url);
  }
}