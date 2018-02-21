import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MentionMySuffix } from './mention-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MentionMySuffix>;

@Injectable()
export class MentionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/mentions';

    constructor(private http: HttpClient) { }

    create(mention: MentionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mention);
        return this.http.post<MentionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mention: MentionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mention);
        return this.http.put<MentionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MentionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MentionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MentionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MentionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MentionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MentionMySuffix[]>): HttpResponse<MentionMySuffix[]> {
        const jsonResponse: MentionMySuffix[] = res.body;
        const body: MentionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MentionMySuffix.
     */
    private convertItemFromServer(mention: MentionMySuffix): MentionMySuffix {
        const copy: MentionMySuffix = Object.assign({}, mention);
        return copy;
    }

    /**
     * Convert a MentionMySuffix to a JSON which can be sent to the server.
     */
    private convert(mention: MentionMySuffix): MentionMySuffix {
        const copy: MentionMySuffix = Object.assign({}, mention);
        return copy;
    }
}
