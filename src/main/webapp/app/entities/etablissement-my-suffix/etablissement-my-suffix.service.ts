import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EtablissementMySuffix } from './etablissement-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EtablissementMySuffix>;

@Injectable()
export class EtablissementMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/etablissements';

    constructor(private http: HttpClient) { }

    create(etablissement: EtablissementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(etablissement);
        return this.http.post<EtablissementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(etablissement: EtablissementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(etablissement);
        return this.http.put<EtablissementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EtablissementMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EtablissementMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EtablissementMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EtablissementMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EtablissementMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EtablissementMySuffix[]>): HttpResponse<EtablissementMySuffix[]> {
        const jsonResponse: EtablissementMySuffix[] = res.body;
        const body: EtablissementMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EtablissementMySuffix.
     */
    private convertItemFromServer(etablissement: EtablissementMySuffix): EtablissementMySuffix {
        const copy: EtablissementMySuffix = Object.assign({}, etablissement);
        return copy;
    }

    /**
     * Convert a EtablissementMySuffix to a JSON which can be sent to the server.
     */
    private convert(etablissement: EtablissementMySuffix): EtablissementMySuffix {
        const copy: EtablissementMySuffix = Object.assign({}, etablissement);
        return copy;
    }
}
