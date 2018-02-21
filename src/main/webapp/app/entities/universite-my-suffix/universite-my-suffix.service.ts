import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UniversiteMySuffix } from './universite-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UniversiteMySuffix>;

@Injectable()
export class UniversiteMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/universites';

    constructor(private http: HttpClient) { }

    create(universite: UniversiteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(universite);
        return this.http.post<UniversiteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(universite: UniversiteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(universite);
        return this.http.put<UniversiteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UniversiteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UniversiteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UniversiteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UniversiteMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UniversiteMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UniversiteMySuffix[]>): HttpResponse<UniversiteMySuffix[]> {
        const jsonResponse: UniversiteMySuffix[] = res.body;
        const body: UniversiteMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UniversiteMySuffix.
     */
    private convertItemFromServer(universite: UniversiteMySuffix): UniversiteMySuffix {
        const copy: UniversiteMySuffix = Object.assign({}, universite);
        return copy;
    }

    /**
     * Convert a UniversiteMySuffix to a JSON which can be sent to the server.
     */
    private convert(universite: UniversiteMySuffix): UniversiteMySuffix {
        const copy: UniversiteMySuffix = Object.assign({}, universite);
        return copy;
    }
}
