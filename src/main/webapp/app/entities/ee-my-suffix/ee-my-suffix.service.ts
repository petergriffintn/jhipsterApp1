import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EeMySuffix } from './ee-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EeMySuffix>;

@Injectable()
export class EeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ees';

    constructor(private http: HttpClient) { }

    create(ee: EeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ee);
        return this.http.post<EeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ee: EeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ee);
        return this.http.put<EeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EeMySuffix[]>): HttpResponse<EeMySuffix[]> {
        const jsonResponse: EeMySuffix[] = res.body;
        const body: EeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EeMySuffix.
     */
    private convertItemFromServer(ee: EeMySuffix): EeMySuffix {
        const copy: EeMySuffix = Object.assign({}, ee);
        return copy;
    }

    /**
     * Convert a EeMySuffix to a JSON which can be sent to the server.
     */
    private convert(ee: EeMySuffix): EeMySuffix {
        const copy: EeMySuffix = Object.assign({}, ee);
        return copy;
    }
}
