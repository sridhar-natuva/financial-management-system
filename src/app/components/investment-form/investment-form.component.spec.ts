import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { Investment, Portfolio } from '../../models/portfolio.model';

describe('InvestmentFormComponent', () => {
    let component: InvestmentFormComponent;
    let fixture: ComponentFixture<InvestmentFormComponent>;
    let mockPortfolioService: jasmine.SpyObj<PortfolioService>;

    const mockPortfolios = signal([
        {
            id: '1', name: 'Portfolio 1',
            investments: [],
            totalValue: 0,
            lastUpdated: new Date()
        },
        {
            id: '2', name: 'Portfolio 2',
            investments: [],
            totalValue: 0,
            lastUpdated: new Date()
        }
    ]);

    beforeEach(async () => {
        mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['getPortfolios', 'addInvestment']);
        mockPortfolioService.getPortfolios.and.returnValue(mockPortfolios);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, InvestmentFormComponent],
            providers: [
                { provide: PortfolioService, useValue: mockPortfolioService }
            ]
        })
            .overrideComponent(InvestmentFormComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent(InvestmentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with invalid form', () => {
        expect(component.investmentForm.valid).toBeFalsy();
    });

    it('should validate required fields', () => {
        const form = component.investmentForm;
        expect(form.get('portfolioId')?.errors?.['required']).toBeTruthy();
        expect(form.get('name')?.errors?.['required']).toBeTruthy();
        expect(form.get('type')?.errors).toBeFalsy(); // Has default value
        expect(form.get('quantity')?.errors?.['min']).toBeTruthy();
        expect(form.get('purchasePrice')?.errors?.['min']).toBeTruthy();
    });

    it('should validate minimum values', () => {
        const form = component.investmentForm;

        form.patchValue({
            quantity: 0,
            purchasePrice: 0
        });

        expect(form.get('quantity')?.errors?.['min']).toBeTruthy();
        expect(form.get('purchasePrice')?.errors?.['min']).toBeTruthy();
    });

    it('should be valid with correct data', () => {
        const validData: any = {
            portfolioId: '1',
            name: 'Test Investment',
            type: 'stock',
            quantity: 10,
            purchasePrice: 100,
            purchaseDate: new Date().toISOString().split('T')[0]
        };

        component.investmentForm.patchValue(validData);
        expect(component.investmentForm.valid).toBeTruthy();
    });

    it('should call addInvestment on valid form submission', () => {
        const validData: any = {
            portfolioId: '1',
            name: 'Test Investment',
            type: 'stock',
            quantity: 10,
            purchasePrice: 100,
            purchaseDate: new Date().toISOString().split('T')[0]
        };

        component.investmentForm.patchValue(validData);
        component.onSubmit();

        expect(mockPortfolioService.addInvestment).toHaveBeenCalled();
    });

    it('should not call addInvestment on invalid form submission', () => {
        component.onSubmit();
        expect(mockPortfolioService.addInvestment).not.toHaveBeenCalled();
    });

    it('should reset form when resetForm is called', () => {
        const validData: any = {
            portfolioId: '1',
            name: 'Test Investment',
            type: 'stock',
            quantity: 10,
            purchasePrice: 100,
            purchaseDate: new Date().toISOString().split('T')[0]
        };

        component.investmentForm.patchValue(validData);
        component.resetForm();

        expect(component.investmentForm.get('name')?.value).toBe('');
        expect(component.investmentForm.get('quantity')?.value).toBe(0);
    });
});