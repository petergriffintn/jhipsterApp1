import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SpecialiteMySuffix } from './specialite-my-suffix.model';
import { SpecialiteMySuffixService } from './specialite-my-suffix.service';

@Injectable()
export class SpecialiteMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private specialiteService: SpecialiteMySuffixService

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
                this.specialiteService.find(id)
                    .subscribe((specialiteResponse: HttpResponse<SpecialiteMySuffix>) => {
                        const specialite: SpecialiteMySuffix = specialiteResponse.body;
                        this.ngbModalRef = this.specialiteModalRef(component, specialite);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.specialiteModalRef(component, new SpecialiteMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    specialiteModalRef(component: Component, specialite: SpecialiteMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.specialite = specialite;
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
