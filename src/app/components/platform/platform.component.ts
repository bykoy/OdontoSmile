import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RoleGuard } from 'src/app/role.guard';

@Component({
    selector: 'app-platform',
    templateUrl: './platform.component.html',
    styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {
    isProfile;

    user = JSON.parse(localStorage.getItem('user'));

    @ViewChild('sidenav') sidenav: MatSidenav;
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;
    public dataRoute = {
        title: 'Clinica Smiles'
    };

    constructor(private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _route: ActivatedRoute,
        private _router: Router,
        private _apiService: ApiService,
        private roleGuard: RoleGuard) {
        this.mobileQuery = _media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        _router.events.subscribe(() => {
            if (_route.snapshot.firstChild.data.title === 'Perfil') {
                this.isProfile = true;
            } else {
                this.isProfile = false;
            }
        });
    }

    ngOnInit() {
        this.validateSession();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    validateSession() {
        this._apiService.validate().subscribe(response => {
            if (!response.success) {
                this._apiService.logout();
            }
        });
    }

    logout() {
        this._apiService.logout();
    }

    navOpened() {
        if (!this.mobileQuery.matches) { return true; }
    }

    @HostListener('window:resize')
    onResize() {
        if (this.mobileQuery.matches) { this.sidenav.close(); }
        if (!this.mobileQuery.matches) { this.sidenav.open(); }
    }

    hasRole(r: any): boolean {
        const { scopes = [] } = { "scopes": this.user.role };
        if (r == null) {
            return true;
        } else {
            if (r.includes(scopes)) {
                return true;
            } else {
                return false;
            }
        }
    }

}
