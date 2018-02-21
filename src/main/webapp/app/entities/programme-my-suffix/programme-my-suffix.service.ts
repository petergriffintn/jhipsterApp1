import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProgrammeMySuffix } from './programme-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProgrammeMySuffix>;

@Injectable()
export class ProgrammeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/programmes';

    constructor(private http: HttpClient) { }

    create(programme: ProgrammeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(programme);
        return this.http.post<ProgrammeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(programme: ProgrammeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(programme);
        return this.http.put<ProgrammeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProgrammeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProgrammeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProgrammeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProgrammeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProgrammeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProgrammeMySuffix[]>): HttpResponse<ProgrammeMySuffix[]> {
        const jsonResponse: ProgrammeMySuffix[] = res.body;
        const body: ProgrammeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProgrammeMySuffix.
     */
    private convertItemFromServer(programme: ProgrammeMySuffix): ProgrammeMySuffix {
        const copy: ProgrammeMySuffix = Object.assign({}, programme);
        return copy;
    }

    /**
     * Convert a ProgrammeMySuffix to a JSON which can be sent to the server.
     */
    private convert(programme: ProgrammeMySuffix): ProgrammeMySuffix {
        const copy: ProgrammeMySuffix = Object.assign({}, programme);
        return copy;
    }
}
