import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pessoa } from "../models/Pessoas";

@Injectable()
export class PessoasService{
  elementApiUrl = 'https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/';
  constructor(private http: HttpClient) { }


  getElements(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.elementApiUrl);
  }

  createElements(element: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.elementApiUrl, element);
  }

  editElement(element: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.elementApiUrl, element);
  }

  deleteElement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
  }
}
