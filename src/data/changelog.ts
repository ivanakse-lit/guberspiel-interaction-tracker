
import { ChangelogEntry } from '@/types/changelog';

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "1.1.0",
    date: "2024-06-24",
    type: "minor",
    changes: {
      added: [
        "Google OAuth authentication for one-click sign-in",
        "Social login integration alongside email/password authentication"
      ]
    }
  },
  {
    version: "1.0.0",
    date: "2024-06-24",
    type: "major",
    changes: {
      added: [
        "Initial release of Güberspiel",
        "Circle creation and management system",
        "Secure invitation system with email-based invites",
        "Interaction logging and tracking",
        "Dashboard with balance overview",
        "Analytics dashboard with comprehensive metrics",
        "User authentication via Supabase",
        "Responsive design with Tailwind CSS"
      ]
    }
  }
];
