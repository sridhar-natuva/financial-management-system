import { Component, input } from '@angular/core';

/**
 * Base interface for tab components
 * All tab components should implement this interface
 */
export interface TabComponent {
  tabKey: string;
  tabLabel: string;
}

@Component({
  selector: 'app-base-tab',
  template: '',
  standalone: true
})
export abstract class BaseTabComponent implements TabComponent {
  abstract tabKey: string;
  abstract tabLabel: string;
}
