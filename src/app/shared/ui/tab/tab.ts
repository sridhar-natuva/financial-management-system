import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  template: `
      <ng-content></ng-content>
  `,
  styleUrl: './tab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab {

}
