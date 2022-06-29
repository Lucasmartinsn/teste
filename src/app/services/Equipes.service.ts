import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Equipes } from "../models/Equipes";

@Injectable()
export class PessoasService{
  elementApiUrl = 'https://sistema-aprendizes-brisanet-go.herokuapp.com/equipe/';
  constructor(private http: HttpClient) { }


  getElements(): Observable<Equipes[]> {
    return this.http.get<Equipes[]>(this.elementApiUrl);
  }

  createElements(element: Equipes): Observable<Equipes> {
    return this.http.post<Equipes>(this.elementApiUrl, element);
  }

  editElement(element: Equipes): Observable<Equipes> {
    return this.http.put<Equipes>(this.elementApiUrl, element);
  }

  deleteElement(id_pessoa: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id_pessoa=${id_pessoa}`);
  }
}
