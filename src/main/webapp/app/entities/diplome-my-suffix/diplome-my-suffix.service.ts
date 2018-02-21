import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DiplomeMySuffix } from './diplome-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DiplomeMySuffix>;

@Injectable()
export class DiplomeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/diplomes';

    constructor(private http: HttpClient) { }

    create(diplome: DiplomeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(diplome);
        return this.http.post<DiplomeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(diplome: DiplomeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(diplome);
        return this.http.put<DiplomeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DiplomeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DiplomeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiplomeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiplomeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DiplomeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DiplomeMySuffix[]>): HttpResponse<DiplomeMySuffix[]> {
        const jsonResponse: DiplomeMySuffix[] = res.body;
        const body: DiplomeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DiplomeMySuffix.
     */
    private convertItemFromServer(diplome: DiplomeMySuffix): DiplomeMySuffix {
        const copy: DiplomeMySuffix = Object.assign({}, diplome);
        return copy;
    }

    /**
     * Convert a DiplomeMySuffix to a JSON which can be sent to the server.
     */
    private convert(diplome: DiplomeMySuffix): DiplomeMySuffix {
        const copy: DiplomeMySuffix = Object.assign({}, diplome);
        return copy;
    }
}
