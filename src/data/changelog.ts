import { ChangelogEntry } from '@/types/changelog';

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "1.2.2",
    date: "2025-01-08",
    type: "patch",
    changes: {
      fixed: [
        "Regenerated Supabase API keys for enhanced security after public exposure",
        "Updated authentication tokens across all client configurations"
      ],
      changed: [
        "Refreshed Supabase client initialization with new secure tokens"
      ]
    }
  },
  {
    version: "1.2.1",
    date: "2024-06-26",
    type: "patch",
    changes: {
      added: [
        "User authentication status indicator in header showing welcome message with user name",
        "Dynamic navigation buttons based on authentication state (Dashboard/Sign Out for logged users, Sign In for guests)",
        "Improved user experience with clear visual feedback of login status"
      ],
      changed: [
        "Main call-to-action button text changes based on authentication state",
        "Header layout enhanced to accommodate user status information"
      ]
    }
  },
  {
    version: "1.2.0",
    date: "2024-06-26",
    type: "minor",
    changes: {
      added: [
        "Backdate interactions feature - log moments of kindness with their actual occurrence date",
        "Comprehensive interaction history with detailed timeline tracking",
        "Enhanced recent interactions display showing both occurrence and logging timestamps",
        "New History tab in dashboard for complete interaction timeline",
        "Date picker for selecting when interactions actually happened"
      ]
    }
  },
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
