import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ProgressSegment {
  color: string;
  width: string;
}

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="progress-bar">
      @for (segment of segments(); track $index) {
        <div 
          class="segment" 
          [style.background]="segment.color" 
          [style.width]="segment.width">
        </div>
      }
    </div>
  `,
  styles: [`
    .progress-bar {
      display: flex;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      background: #f0f2f5;
      
      .segment {
        height: 100%;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  segments = input.required<ProgressSegment[]>();
}
