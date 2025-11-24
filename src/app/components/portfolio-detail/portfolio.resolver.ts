import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Portfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

export const portfolioResolver: ResolveFn<Portfolio | null> = (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const service = inject(PortfolioService);
    if (!id) {
        return null;
    }
    return service.getPortfolioById(id) ?? null;
};