import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button 
      type="button"
      class="btn"
      [ngClass]="variant()"
      [disabled]="disabled()"
      [attr.type]="type()">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      border: none;
      border-radius: 8px;
      padding: 0.6rem 1.3rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      
      &:disabled {
        background: #cccccc;
        color: #666;
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      &.primary {
        background: #2563eb;
        color: #fff;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
        
        &:hover:not(:disabled) {
          background: #174ea6;
        }
      }
      
      &.secondary {
        background: #f4f6fa;
        color: #2563eb;
        
        &:hover:not(:disabled) {
          background: #e6f0fa;
        }
      }
      
      &.outline {
        background: #fff;
        color: #2563eb;
        border: 1.5px solid #2563eb;
        
        &:hover:not(:disabled) {
          background: #2563eb;
          color: #fff;
        }
      }
      
      &.ghost {
        background: transparent;
        color: #2563eb;
        
        &:hover:not(:disabled) {
          background: #f4f6fa;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
}
