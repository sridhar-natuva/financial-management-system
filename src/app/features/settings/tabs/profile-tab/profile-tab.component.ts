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
  selector: 'app-profile-tab',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTabComponent {
  profileForm = signal<ProfileForm>({
    fullName: 'Sridhar Natuva',
    email: 's.natuva@email.com',
    bio: 'Financial enthusiast and long-term investor.',
    phone: '',
    country: 'India',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sridhar'
  });

  countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];

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
