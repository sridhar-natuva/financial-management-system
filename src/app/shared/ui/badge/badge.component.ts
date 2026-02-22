import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type BadgeVariant = 'active' | 'balanced' | 'closed' | 'high-risk' | 'default';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span class="badge" [ngClass]="variant()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: 6px;
      padding: 0.3em 0.9em;
      display: inline-block;
      
      &.active {
        background: #e6f4ea;
        color: #1a7f37;
      }
      
      &.balanced {
        background: #e6f0fa;
        color: #2563eb;
      }
      
      &.closed {
        background: #fbeaea;
        color: #d7263d;
      }
      
      &.high-risk {
        background: #f3e8ff;
        color: #a21caf;
      }
      
      &.default {
        background: #f4f6fa;
        color: #6c7a89;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
}
