import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../app.config';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) {}

    checkHealth(): Observable<boolean> {
        const url = `${CONFIG.api_base}/health`;
        return this.http.get<boolean>(url).pipe(
            map((res) => res),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('API is down. Please run the API');
        } else {
            console.error(
                `API returned code ${error.status}, message: ${error.message}`
            );
        }

        return throwError(() => new Error(`API Errored. Please check the API`));
    }
}
