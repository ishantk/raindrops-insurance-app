import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Plan } from "../models/plan.model";

@Injectable()
export class PlanService {
    constructor(private http: HttpClient) { }

    public getPlan(): Observable<Plan[]> {
        return this.http.get<Plan[]>(environment.url + '/plans');
    }

    public getPlanDetails(planId: Number): Observable<Plan> {
        return this.http.get<Plan>(environment.url + '/plans/' + planId);
    }
}