import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Investment } from '../../../shared/models/portfolio.model';
import { PortfolioService } from '../../../shared/services/portfolio.service';

@Component({
  selector: 'app-investment-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add New Investment</h2>
      <form [formGroup]="investmentForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="portfolioId">Portfolio</label>
          <select id="portfolioId" formControlName="portfolioId" required>
            @for (portfolio of portfolios(); track portfolio.id) {
              <option [value]="portfolio.id">{{ portfolio.name }}</option>
            }
          </select>
        </div>

        <div class="form-field">
          <label for="name">Investment Name</label>
          <input id="name" type="text" formControlName="name" required>
          @if (investmentForm.get('name')?.hasError('required') && investmentForm.get('name')?.touched) {
            <span class="error">name is required</span>
          }
        </div>

        <div class="form-field">
          <label for="type">Type</label>
          <select id="type" formControlName="type" required>
            <option value="stock">Stock</option>
            <option value="bond">Bond</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="mutual-fund">Mutual Fund</option>
          </select>
          @if (investmentForm.get('type')?.hasError('required') && investmentForm.get('type')?.touched) {
            <span class="error">type is required</span>
          }
        </div>

        <div class="form-field">
          <label for="quantity">Quantity</label>
          <input id="quantity" type="number" formControlName="quantity" required>
          @if (investmentForm.get('quantity')?.hasError('min') && investmentForm.get('quantity')?.touched) {
            <span class="error">quantity should be atleast 1</span>
          }
        </div>

        <div class="form-field">
          <label for="purchasePrice">Purchase Price</label>
          <input id="purchasePrice" type="number" formControlName="purchasePrice" required>
          @if (investmentForm.get('purchasePrice')?.hasError('min') && investmentForm.get('purchasePrice')?.touched) {
            <span class="error">purchasePrice should be atleast 1</span>
          }
        </div>

        <div class="form-field">
          <label for="purchaseDate">Purchase Date</label>
          <input id="purchaseDate" type="date" formControlName="purchaseDate" required>
          @if (investmentForm.get('purchaseDate')?.hasError('required') && investmentForm.get('purchaseDate')?.touched) {
            <span class="error">purchaseDate is required</span>
          }
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="!investmentForm.valid">Add Investment</button>
          <button type="button" (click)="resetForm()">Reset</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: 20px auto;
    }
    .form-field {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    input, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: #dc3545;
      font-size: 0.875em;
      margin-top: 5px;
      display: block;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background: #2c3e50;
      color: white;
    }
    button[type="submit"]:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    button[type="button"] {
      background: #e9ecef;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentFormComponent {
  newInvestmentDetails = output<{ investment: Investment, portfolioId: string }>();
  investmentForm = new FormGroup({
    portfolioId: new FormControl<Investment['id']>('', { validators: Validators.required, nonNullable: true }),
    name: new FormControl<Investment['name']>('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
    type: new FormControl<Investment['type']>('bond', { validators: Validators.required, nonNullable: true }),
    quantity: new FormControl<Investment['quantity']>(0, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    purchasePrice: new FormControl<Investment['purchasePrice']>(0, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    purchaseDate: new FormControl<Investment['purchaseDate']>(new Date(), { validators: Validators.required, nonNullable: true })
  });
  portfolioService = inject(PortfolioService);
  portfolios = this.portfolioService.getPortfolios();

  onSubmit(): void {
    if (this.investmentForm.valid) {
      const formValue = this.investmentForm.getRawValue();
      const investment: Investment = {
        id: crypto.randomUUID(),
        name: formValue.name,
        type: formValue.type,
        quantity: formValue.quantity,
        purchasePrice: formValue.purchasePrice,
        currentPrice: formValue.purchasePrice, // Initially set to purchase price
        purchaseDate: new Date(formValue.purchaseDate)
      };
      this.newInvestmentDetails.emit({ investment, portfolioId: formValue.portfolioId });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.investmentForm.reset();
  }
}
