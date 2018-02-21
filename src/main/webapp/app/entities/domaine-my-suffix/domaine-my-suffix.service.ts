import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DomaineMySuffix } from './domaine-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DomaineMySuffix>;

@Injectable()
export class DomaineMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/domaines';

    constructor(private http: HttpClient) { }

    create(domaine: DomaineMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(domaine);
        return this.http.post<DomaineMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(domaine: DomaineMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(domaine);
        return this.http.put<DomaineMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DomaineMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DomaineMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DomaineMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DomaineMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DomaineMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DomaineMySuffix[]>): HttpResponse<DomaineMySuffix[]> {
        const jsonResponse: DomaineMySuffix[] = res.body;
        const body: DomaineMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DomaineMySuffix.
     */
    private convertItemFromServer(domaine: DomaineMySuffix): DomaineMySuffix {
        const copy: DomaineMySuffix = Object.assign({}, domaine);
        return copy;
    }

    /**
     * Convert a DomaineMySuffix to a JSON which can be sent to the server.
     */
    private convert(domaine: DomaineMySuffix): DomaineMySuffix {
        const copy: DomaineMySuffix = Object.assign({}, domaine);
        return copy;
    }
}
