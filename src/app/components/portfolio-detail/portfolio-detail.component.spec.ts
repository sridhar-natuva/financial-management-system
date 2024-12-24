import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioDetailComponent } from './portfolio-detail.component';
import { CommonModule } from '@angular/common';

describe('PortfolioDetailComponent', () => {
    let component: PortfolioDetailComponent;
    let fixture: ComponentFixture<PortfolioDetailComponent>;

    const mockPortfolio: any = {
        id: '1',
        name: 'Test Portfolio',
        description: 'Test Description',
        totalValue: 10000,
        investments: [
            {
                id: '1',
                name: 'Test Stock',
                type: 'stock',
                quantity: 10,
                purchasePrice: 100,
                currentPrice: 150,
                purchaseDate: new Date()
            }
        ]
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, PortfolioDetailComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PortfolioDetailComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('portfolio', mockPortfolio);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display portfolio name', () => {
        const element = fixture.nativeElement;
        const title = element.querySelector('h3');
        expect(title.textContent).toContain(mockPortfolio.name);
    });

    it('should display portfolio total value', () => {
        const element = fixture.nativeElement;
        const value = element.querySelector('.value');
        expect(value.textContent).toContain('$10,000.00');
    });

    it('should display all investments', () => {
        const element = fixture.nativeElement;
        const investments = element.querySelectorAll('.investment-item');
        expect(investments.length).toBe(mockPortfolio.investments.length);
    });

    it('should calculate and display investment value correctly', () => {
        const element = fixture.nativeElement;
        const investmentValue = element.querySelector('.investment-item span:last-child');
        // 10 quantity * $150 current price = $1,500
        expect(investmentValue.textContent).toContain('$1,500.00');
    });
});