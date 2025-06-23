
# GratitudeCoin - Tracking Acts of Kindness in Communities

A web application that helps communities track and celebrate acts of kindness through a point-based gratitude system.

## 🌟 What is GratitudeCoin?

GratitudeCoin is a digital platform designed to foster appreciation and strengthen relationships within small, close-knit communities like families, friend groups, flatmates, or study groups. Members can give and receive "gratitude points" for acts of kindness, creating a beautiful record of care and support within their circles.

## ✨ Key Features

### 🔐 Secure Circle Management
- **Invitation-only circles** - Join only through secure, email-specific invitations
- **Pre-approved invitations** with expiring tokens for enhanced security
- **Circle creation** with customizable descriptions and settings

### 💝 Gratitude Tracking
- **Log interactions** - Record acts of kindness with descriptions and point values
- **Balance tracking** - See your giving/receiving balance across all circles
- **Recent activity** - View recent moments of care and appreciation

### 👥 Community Features
- **Multiple circles** - Participate in various communities (family, friends, work, etc.)
- **Circle overview** - See member activity and circle dynamics
- **History tracking** - Browse past interactions and milestones

### 🎨 Beautiful User Experience
- **Warm, caring design** with gradient themes in orange and rose tones
- **Responsive interface** that works on all devices
- **Intuitive navigation** with clear visual feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd gratitudecoin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Backend**: Supabase (Authentication, Database, Real-time)
- **State Management**: React Query for server state
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard-specific components
│   └── AuthForm.tsx        # Authentication form
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Auth.tsx           # Authentication page
│   ├── CreateGroup.tsx    # Circle creation
│   ├── JoinGroup.tsx      # Circle joining
│   ├── LogInteraction.tsx # Interaction logging
│   └── ...                # Other pages
├── services/
│   └── circleService.ts   # API service functions
└── lib/
    └── utils.ts           # Utility functions
```

## 🔧 Key Components

### Authentication
- Secure user registration and login via Supabase Auth
- Protected routes requiring authentication
- User session management

### Circle Management
- Create new circles with invite codes
- Join circles through secure invitations
- Manage circle memberships and permissions

### Interaction Tracking
- Log acts of kindness with descriptions
- Assign point values to interactions
- Track giving and receiving across circles

## 🎯 Use Cases

- **Families**: Track household chores, emotional support, and family activities
- **Flatmates**: Appreciate cleaning, cooking, and shared responsibilities
- **Friend Groups**: Celebrate social support, favors, and quality time
- **Study Groups**: Recognize academic help, resource sharing, and encouragement
- **Work Teams**: Acknowledge collaboration, mentoring, and team support

## 🔮 Future Enhancements

- Email notifications for invitations and interactions
- Advanced analytics and insights
- Achievements and milestones
- Mobile app development
- Integration with calendar and task management tools

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with love using modern web technologies
- Inspired by the power of gratitude and community
- Designed to strengthen human connections in our digital age

---

*GratitudeCoin - Where every act of kindness counts* ✨
