import {Injectable} from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment} from '../../environments/environment';

import { Booking } from "../models/booking.model";

@Injectable()
export class BookingService {
    constructor(private http: HttpClient){}

    private getHeader() {
        return {headers: {'Content-Type': 'application/json'}};
    }

    public bookingAdd(params: any): Observable<Booking>{ 
        return this.http.post<Booking>(environment.url + '/bookings', JSON.stringify(params), this.getHeader());
    }
}