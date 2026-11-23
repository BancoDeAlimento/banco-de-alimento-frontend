import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Impacto {
  totalKg: number;
}

/** Busca o total de alimentos movimentados (GET /api/impacto, do back-end). */
@Injectable({ providedIn: 'root' })
export class ImpactoService {
  private readonly http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}/api/impacto`;

  buscar(): Observable<Impacto> {
    return this.http.get<Impacto>(this.url);
  }
}