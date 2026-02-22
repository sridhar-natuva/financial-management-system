import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ViewChild,
  viewChild,
} from '@angular/core';
import { TabListDirective, TabPanelDirective, TabTriggerDirective, TabsDirective } from '@sridhar_natuva/primitives';
import { ProfileTabComponent } from './tabs/profile-tab/profile-tab.component';
import { PreferencesTabComponent } from './tabs/preferences-tab/preferences-tab.component';
import { Tab } from '../../shared/ui/tab/tab';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ProfileTabComponent,
    PreferencesTabComponent,
    TabsDirective,
    TabTriggerDirective,
    TabPanelDirective,
    TabListDirective,
    Tab
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  // @ViewChild('tabs', { read: TabsDirective })
  // tabs!: TabsDirective;
  // ngAfterViewInit() {
  //   effect(() => {
  //     console.log('Selected Tab:', this.tabs);
  //   });
  // }
}
