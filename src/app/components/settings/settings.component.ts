import { 
  ChangeDetectionStrategy, 
  Component, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  computed, 
  signal
} from '@angular/core';
import { BaseTabComponent } from './tabs/base-tab.component';
import { ProfileTabComponent } from './tabs/profile-tab.component';
import { PreferencesTabComponent } from './tabs/preferences-tab.component';

interface TabInfo {
  label: string;
  key: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ProfileTabComponent, PreferencesTabComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements AfterContentInit {
  // Content query to discover tab components projected via ng-content
  // This allows tabs to be added dynamically from parent components
  @ContentChildren(BaseTabComponent) 
  projectedTabs!: QueryList<BaseTabComponent>;
  
  selectedTab = signal<string>('profile');
  
  // Static tab registry for directly imported tab components
  // In a real app, this could be a registry service
  private staticTabs: TabInfo[] = [
    { label: 'Profile', key: 'profile' },
    { label: 'Notifications', key: 'notifications' },
    { label: 'Security', key: 'security' },
    { label: 'Preferences', key: 'preferences' }
  ];

  // Compute available tabs: prioritize projected tabs, fallback to static
  // This demonstrates the power of content queries - tabs can be added dynamically
  tabs = computed<TabInfo[]>(() => {
    // If we have projected tabs (via ng-content), use those
    if (this.projectedTabs && this.projectedTabs.length > 0) {
      return this.projectedTabs.map(tab => ({
        label: tab.tabLabel,
        key: tab.tabKey
      }));
    }
    
    // Otherwise, use static tab definitions
    return this.staticTabs;
  });

  ngAfterContentInit() {
    // Content queries are populated after content initialization
    // If tabs are projected, they'll be available here
    if (this.projectedTabs && this.projectedTabs.length > 0) {
      // Set first projected tab as default if available
      const firstTab = this.projectedTabs.first;
      if (firstTab) {
        this.selectedTab.set(firstTab.tabKey);
      }
    }
  }

  onTabSelect(tab: string) {
    this.selectedTab.set(tab);
  }

  isTabActive(tabKey: string): boolean {
    return this.selectedTab() === tabKey;
  }
}
