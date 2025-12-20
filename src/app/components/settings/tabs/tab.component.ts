import { Component, input, signal } from "@angular/core";

@Component({
    selector: 'app-tab',
    template: `
      @if (active()) {
        <ng-content />
      }
    `
  })
  export class TabComponent {
    active = signal<boolean>(false);
    title = input.required<string>();
  }
  