import { 
  ChangeDetectionStrategy, 
  Component,
} from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { ProfileTabComponent } from './tabs/profile-tab/profile-tab.component';
import { PreferencesTabComponent } from './tabs/preferences-tab/preferences-tab.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabsComponent, TabComponent, ProfileTabComponent, PreferencesTabComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
}
