import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus } from '../../models/reservation.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {}

  // Crear una nueva reservación
  createReservation(reservationData: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservationData);
  }

  // Obtener una reservación por ID
  getReservationById(id: string | number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una reservación existente
  updateReservation(
    id: string | number, 
    updates: Partial<Reservation>
  ): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, updates);
  }

  // Cancelar una reservación
  cancelReservation(id: string | number): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.apiUrl}/${id}/status`, 
      { status: ReservationStatus.CANCELLED }
    );
  }

  // Obtener reservaciones por restaurante
  getReservationsByRestaurant(
    restaurantId: string | number,
    filters: {
      date?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    } = {}
  ): Observable<Reservation[]> {
    let params = new HttpParams();
    
    // Añadir filtros a los parámetros de la solicitud
    if (filters.date) params = params.set('date', filters.date);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<Reservation[]>(
      `${this.apiUrl}/restaurant/${restaurantId}`, 
      { params }
    );
  }

  // Obtener reservaciones del usuario actual
  getUserReservations(userId: string | number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Verificar disponibilidad
  checkAvailability(
    restaurantId: string | number,
    date: string,
    time: string,
    partySize: number
  ): Observable<{ available: boolean; message?: string }> {
    const params = new HttpParams()
      .set('date', date)
      .set('time', time)
      .set('partySize', partySize.toString());

    return this.http.get<{ available: boolean; message?: string }>(
      `${this.apiUrl}/check-availability/${restaurantId}`,
      { params }
    );
  }

  // Actualizar estado de una reservación
  updateReservationStatus(
    id: string | number,
    status: ReservationStatus,
    notes?: string
  ): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.apiUrl}/${id}/status`,
      { status, notes }
    );
  }

  // Obtener estadísticas de reservaciones
  getReservationStats(restaurantId: string | number): Observable<{
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    completed: number;
    byDate: Array<{ date: string; count: number }>;
  }> {
    return this.http.get<any>(`${this.apiUrl}/stats/${restaurantId}`);
  }
}
