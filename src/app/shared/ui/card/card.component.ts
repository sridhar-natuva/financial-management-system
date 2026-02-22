import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(44, 62, 80, 0.07);
      padding: 2rem 1.5rem;
      transition: box-shadow 0.3s ease, transform 0.2s ease;
      
      &:hover {
        box-shadow: 0 6px 32px rgba(44, 62, 80, 0.12);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
}
