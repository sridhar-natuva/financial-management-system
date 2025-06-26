import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProfileForm {
  fullName: string;
  email: string;
  bio: string;
  phone: string;
  country: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  tabs = [
    { label: 'Profile', key: 'profile' },
    { label: 'Notifications', key: 'notifications' },
    { label: 'Security', key: 'security' },
    { label: 'Preferences', key: 'preferences' }
  ];
  selectedTab = signal('profile');

  profileForm = signal<ProfileForm>({
    fullName: 'Sridhar Natuva',
    email: 's.natuva@email.com',
    bio: 'Financial enthusiast and long-term investor.',
    phone: '',
    country: 'United States',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sridhar'
  });

  countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];

  onTabSelect(tab: string) {
    this.selectedTab.set(tab);
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // In a real app, upload and get URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.update(form => ({ ...form, avatarUrl: e.target.result }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSave() {
    // Placeholder for save action
    alert('Profile changes saved!');
  }
}
