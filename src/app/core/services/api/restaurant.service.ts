import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant, TimeSlot } from '../../models/restaurant.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = `${environment.apiUrl}/restaurants`;

  constructor(private http: HttpClient) {}

  // Obtener todos los restaurantes
  getRestaurants(params?: any): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl, { params });
  }

  // Obtener un restaurante por ID
  getRestaurantById(id: string | number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo restaurante
  createRestaurant(restaurant: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  // Actualizar un restaurante existente
  updateRestaurant(id: string | number, restaurant: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, restaurant);
  }

  // Eliminar un restaurante
  deleteRestaurant(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener disponibilidad de un restaurante
  getRestaurantAvailability(
    restaurantId: string | number, 
    date: string, 
    partySize: number
  ): Observable<TimeSlot[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('partySize', partySize.toString());

    return this.http.get<TimeSlot[]>(`${this.apiUrl}/${restaurantId}/availability`, { params });
  }

  // Buscar restaurantes por criterios
  searchRestaurants(criteria: any): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/search`, { params: criteria });
  }

  // Subir imagen del restaurante
  uploadRestaurantImage(restaurantId: string | number, file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    
    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/${restaurantId}/upload-image`, 
      formData
    );
  }
}
