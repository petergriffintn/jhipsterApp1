import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SpecialiteMySuffix } from './specialite-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SpecialiteMySuffix>;

@Injectable()
export class SpecialiteMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/specialites';

    constructor(private http: HttpClient) { }

    create(specialite: SpecialiteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(specialite);
        return this.http.post<SpecialiteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(specialite: SpecialiteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(specialite);
        return this.http.put<SpecialiteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SpecialiteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SpecialiteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SpecialiteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SpecialiteMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SpecialiteMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SpecialiteMySuffix[]>): HttpResponse<SpecialiteMySuffix[]> {
        const jsonResponse: SpecialiteMySuffix[] = res.body;
        const body: SpecialiteMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SpecialiteMySuffix.
     */
    private convertItemFromServer(specialite: SpecialiteMySuffix): SpecialiteMySuffix {
        const copy: SpecialiteMySuffix = Object.assign({}, specialite);
        return copy;
    }

    /**
     * Convert a SpecialiteMySuffix to a JSON which can be sent to the server.
     */
    private convert(specialite: SpecialiteMySuffix): SpecialiteMySuffix {
        const copy: SpecialiteMySuffix = Object.assign({}, specialite);
        return copy;
    }
}
