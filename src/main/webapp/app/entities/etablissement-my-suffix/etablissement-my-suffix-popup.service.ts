import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EtablissementMySuffix } from './etablissement-my-suffix.model';
import { EtablissementMySuffixService } from './etablissement-my-suffix.service';

@Injectable()
export class EtablissementMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private etablissementService: EtablissementMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.etablissementService.find(id)
                    .subscribe((etablissementResponse: HttpResponse<EtablissementMySuffix>) => {
                        const etablissement: EtablissementMySuffix = etablissementResponse.body;
                        this.ngbModalRef = this.etablissementModalRef(component, etablissement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.etablissementModalRef(component, new EtablissementMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    etablissementModalRef(component: Component, etablissement: EtablissementMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.etablissement = etablissement;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
