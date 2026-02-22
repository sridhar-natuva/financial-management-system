import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stat',
  standalone: true,
  template: `
    <div class="stat">
      <span class="label">{{ label() }}</span>
      <span class="value" [class.positive]="positive()" [class.negative]="negative()">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styles: [`
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .label {
        color: #6c7a89;
        font-size: 0.95rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .value {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2c3e50;
        line-height: 1.2;
        
        &.positive {
          color: #1a7f37;
        }
        
        &.negative {
          color: #d7263d;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatComponent {
  label = input.required<string>();
  positive = input<boolean>(false);
  negative = input<boolean>(false);
}
