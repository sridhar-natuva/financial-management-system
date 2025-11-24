import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { MockDataService } from './mock-data.service';
import { Portfolio, Investment } from '../models/portfolio.model';

describe('PortfolioService', () => {
    let service: PortfolioService;
    let mockDataService: MockDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PortfolioService, MockDataService]
        });

        service = TestBed.inject(PortfolioService);
        mockDataService = TestBed.inject(MockDataService);
    });

    it('should initialize portfolios from MockDataService', () => {
        const portfoliosSignal = service.getPortfolios();
        const portfolios = portfoliosSignal();

        // Basic expectations: two portfolios with expected ids
        expect(portfolios.length).toBeGreaterThan(0);
        const ids = portfolios.map(p => p.id).sort();
        expect(ids).toContain('1');
        expect(ids).toContain('2');
    });

    it('getPortfolios should return the signal and reflect current value', () => {
        const signal = service.getPortfolios();
        const value = signal();

        // Ensure returned signal has the same shape as the mock data
        const mock = mockDataService.getMockPortfolios();
        expect(value.length).toBe(mock.length);
        expect(value[0].name).toBe(mock[0].name);
    });

    it('addInvestment should add an investment and update totalValue and lastUpdated', () => {
        const signal = service.getPortfolios();
        const before = signal();
        const target = before.find(p => p.id === '1') as Portfolio;
        expect(target).toBeTruthy();

        const initialInvestments = target.investments.length;
        const initialTotal = target.investments.reduce((t, i) => t + i.quantity * i.currentPrice, 0);
        const prevLastUpdated = target.lastUpdated;

        const newInvestment: Investment = {
            id: 'new-1',
            name: 'New Holding',
            type: 'stock',
            quantity: 10,
            purchasePrice: 100,
            currentPrice: 110,
            purchaseDate: new Date()
        };

        service.addInvestment('1', newInvestment);

        const after = signal();
        const updated = after.find(p => p.id === '1') as Portfolio;

        expect(updated.investments.length).toBe(initialInvestments + 1);
        const added = updated.investments.find(i => i.id === 'new-1');
        expect(added).toBeTruthy();

        const expectedTotal = initialTotal + newInvestment.quantity * newInvestment.currentPrice;
        expect(updated.totalValue).toBeCloseTo(expectedTotal, 5);
        expect(updated.lastUpdated.getTime()).toBeGreaterThanOrEqual(prevLastUpdated.getTime());
    });

    it('addInvestment should do nothing for unknown portfolio id', () => {
        const signal = service.getPortfolios();
        const before = signal();

        const fakeInvestment: Investment = {
            id: 'fake',
            name: 'Fake',
            type: 'stock',
            quantity: 1,
            purchasePrice: 1,
            currentPrice: 1,
            purchaseDate: new Date()
        };

        service.addInvestment('no-such-id', fakeInvestment);

        const after = signal();
        // No portfolio should have the fake investment
        const found = after.some(p => p.investments.some(i => i.id === 'fake'));
        expect(found).toBe(false);

        // Lengths of portfolios should be unchanged
        expect(after.length).toBe(before.length);
    });
});
