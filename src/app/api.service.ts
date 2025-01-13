import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://mobile-api-one.vercel.app/api';
  password = 'cP#QWdM0';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('vinicius.santos@ipvc.pt:cP#QWdM0'), // Substitua com suas credenciais
  });

  constructor(private http: HttpClient) {}

  // Viagens
  getAllTravels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/travels`, { headers: this.headers });
  }

  getTravelById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/travels/${id}`, { headers: this.headers });
  }

  createTravel(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/travels`, data, { headers: this.headers });
  }

  updateTravel(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/travels/${id}`, data, { headers: this.headers });
  }

  deleteTravel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/travels/${id}`, { headers: this.headers });
  }

  // Locais
  getLocationsByTravelId(travelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/travels/${travelId}/locations`, { headers: this.headers });
  }

  createLocation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/travels/locations`, data, { headers: this.headers });
  }

  updateLocation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/travels/locations/${id}`, data, { headers: this.headers });
  }

  deleteLocation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/travels/locations/${id}`, { headers: this.headers });
  }

  // Comentários de viagens
  createTravelComment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/travels/comments`, data, { headers: this.headers });
  }

  deleteTravelComment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/travels/comments/${id}`, { headers: this.headers });
  }

  // Comentários de locais
  createLocationComment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/travels/locations/comments`, data, { headers: this.headers });
  }

  deleteLocationComment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/travels/locations/comments/${id}`, { headers: this.headers });
  }
}
const travelData = {
    description: 'Viagem ao Japão',
    type: 'Lazer',
    state: 'Planejado',
    startAt: new Date(),
    endAt: new Date(new Date().getTime() + 86400000),
    createdBy: 'user123',
    prop1: 'Hotel reservado',
    prop2: 'Necessário visto',
    prop3: 'Guias locais',
    isFav: false,
  };