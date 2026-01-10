import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
} from '@angular/core';
import { TabListDirective, TabPanelDirective, TabTriggerDirective, TabsDirective } from '@sridhar_natuva/primitives';
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
    TabListDirective
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent { }
