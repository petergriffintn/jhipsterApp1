import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ParcoursMySuffix } from './parcours-my-suffix.model';
import { ParcoursMySuffixService } from './parcours-my-suffix.service';

@Injectable()
export class ParcoursMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private parcoursService: ParcoursMySuffixService

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
                this.parcoursService.find(id)
                    .subscribe((parcoursResponse: HttpResponse<ParcoursMySuffix>) => {
                        const parcours: ParcoursMySuffix = parcoursResponse.body;
                        this.ngbModalRef = this.parcoursModalRef(component, parcours);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.parcoursModalRef(component, new ParcoursMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    parcoursModalRef(component: Component, parcours: ParcoursMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.parcours = parcours;
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
