import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ParcoursMySuffix } from './parcours-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ParcoursMySuffix>;

@Injectable()
export class ParcoursMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/parcours';

    constructor(private http: HttpClient) { }

    create(parcours: ParcoursMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(parcours);
        return this.http.post<ParcoursMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parcours: ParcoursMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(parcours);
        return this.http.put<ParcoursMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParcoursMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParcoursMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParcoursMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParcoursMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParcoursMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParcoursMySuffix[]>): HttpResponse<ParcoursMySuffix[]> {
        const jsonResponse: ParcoursMySuffix[] = res.body;
        const body: ParcoursMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ParcoursMySuffix.
     */
    private convertItemFromServer(parcours: ParcoursMySuffix): ParcoursMySuffix {
        const copy: ParcoursMySuffix = Object.assign({}, parcours);
        return copy;
    }

    /**
     * Convert a ParcoursMySuffix to a JSON which can be sent to the server.
     */
    private convert(parcours: ParcoursMySuffix): ParcoursMySuffix {
        const copy: ParcoursMySuffix = Object.assign({}, parcours);
        return copy;
    }
}
