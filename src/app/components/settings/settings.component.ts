import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
} from '@angular/core';
import { TabPanelDirective, TabTriggerDirective, TabsDirective } from '@sridhar_natuva/primitives';
import { ProfileTabComponent } from './tabs/profile-tab/profile-tab.component';
import { PreferencesTabComponent } from './tabs/preferences-tab/preferences-tab.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ProfileTabComponent,
    PreferencesTabComponent,
    TabsDirective,
    TabTriggerDirective,
    TabPanelDirective,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  tabState = viewChild(TabsDirective);

  constructor() {
    effect(() => { console.log(this.tabState()) });
  }

}
