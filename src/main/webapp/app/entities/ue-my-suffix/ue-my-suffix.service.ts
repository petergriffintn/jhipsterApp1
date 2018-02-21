import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UeMySuffix } from './ue-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UeMySuffix>;

@Injectable()
export class UeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ues';

    constructor(private http: HttpClient) { }

    create(ue: UeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ue);
        return this.http.post<UeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ue: UeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ue);
        return this.http.put<UeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UeMySuffix[]>): HttpResponse<UeMySuffix[]> {
        const jsonResponse: UeMySuffix[] = res.body;
        const body: UeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UeMySuffix.
     */
    private convertItemFromServer(ue: UeMySuffix): UeMySuffix {
        const copy: UeMySuffix = Object.assign({}, ue);
        return copy;
    }

    /**
     * Convert a UeMySuffix to a JSON which can be sent to the server.
     */
    private convert(ue: UeMySuffix): UeMySuffix {
        const copy: UeMySuffix = Object.assign({}, ue);
        return copy;
    }
}
