
# GratitudeCoin - Tracking Acts of Kindness in Communities

A web application that helps communities track and celebrate acts of kindness through a point-based gratitude system with engaging gamification elements.

## 🌟 What is GratitudeCoin?

GratitudeCoin is a digital platform designed to foster appreciation and strengthen relationships within small, close-knit communities like families, friend groups, flatmates, or study groups. Members can give "gratitude points" for acts of kindness, creating a beautiful record of care and support within their circles.

Built on **Experience Economy principles**, GratitudeCoin transforms routine relationship tracking into a memorable journey of personal growth and connection through thoughtful gamification.

## ✨ Key Features

### 🔐 Secure Circle Management
- **Invitation-only circles** - Join only through secure, email-specific invitations
- **Pre-approved invitations** with expiring tokens for enhanced security
- **Circle creation** with customizable descriptions and settings

### 💝 Gratitude Tracking
- **Log giving interactions** - Record acts of kindness you've given with descriptions and impact levels
- **Individual & Group Benefits** - Track care given to specific people or the entire group
- **Enhanced scoring for group benefits** - Group-wide actions score higher (impact × number of members)
- **Balance tracking** - See your total giving score across all circles
- **Recent activity** - View recent moments of care and appreciation
- **Interaction history** - Browse past acts of kindness with detailed timelines
- **Backdate interactions** - Log moments of care with their actual occurrence date

### 👥 Community Features
- **Multiple circles** - Participate in various communities (family, friends, work, etc.)
- **Circle overview** - See member activity and circle dynamics
- **History tracking** - Browse past interactions and milestones

### 🎮 Gamification & Experience Design
- **Achievement System** - Earn badges for meaningful milestones like "Generous Heart" and "Group Helper"
- **Level Progression** - Gain XP through positive interactions and unlock new features
- **Visual Progress** - Watch your "Gratitude Garden" grow with acts of kindness
- **Social Recognition** - Circle leaderboards and "Member of the Week" nominations
- **Experience Realms** - Entertainment, Education, Escapism, and Esthetic elements woven throughout

### 🎨 Beautiful User Experience
- **Warm, caring design** with gradient themes in orange and rose tones
- **Responsive interface** that works on all devices
- **Intuitive navigation** with clear visual feedback
- **Evolving aesthetics** that respond to user achievements and growth

## 🎭 Experience Economy Framework

GratitudeCoin applies Pine & Gilmore's **Experience Economy** principles to transform relationship tracking from a utility into a meaningful experience:

### Four Realms of Experience
- **Entertainment**: Animated progress, celebrations, and engaging visualizations
- **Educational**: Learning healthy relationship patterns through giving feedback
- **Escapist**: Personal achievement galleries and customizable identity spaces  
- **Esthetic**: Beautiful, harmonious design that reflects inner generosity

### Experience Transformation
- **From Service to Experience**: Beyond tracking to staging memorable gratitude journeys
- **From Generic to Personal**: Adaptive challenges and customized recognition
- **From Individual to Community**: Shared adventures through circle challenges
- **From Static to Dynamic**: Evolving narratives and seasonal events

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)

### Local Development

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

### 🐳 Docker Deployment

#### Development with Docker

1. Build and run the application:
```bash
docker-compose up --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

3. To run in detached mode:
```bash
docker-compose up -d --build
```

4. To stop the containers:
```bash
docker-compose down
```

#### Production Deployment

1. Use the production Docker Compose configuration:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

2. The application will be available at [http://localhost](http://localhost) (port 80)

3. To view logs:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

4. To stop the production deployment:
```bash
docker-compose -f docker-compose.prod.yml down
```

#### Docker Configuration Details

- **Multi-stage build**: Uses Node.js for building and Nginx for serving
- **Optimized images**: Alpine Linux base images for smaller size
- **Health checks**: Automatic health monitoring in production
- **Static asset caching**: 1-year cache for static files
- **Gzip compression**: Enabled for better performance
- **Security headers**: XSS protection, content type sniffing prevention
- **SPA routing**: Proper handling of client-side React Router routes

#### Environment Variables

The Docker containers support the following environment variables:

- `NODE_ENV`: Set to `production` for optimized builds
- Custom Supabase configuration can be added as needed

#### Docker Files Overview

- `Dockerfile`: Multi-stage build configuration
- `docker-compose.yml`: Development deployment (port 3000)
- `docker-compose.prod.yml`: Production deployment (port 80)
- `nginx.conf`: Nginx configuration for serving the React app
- `.dockerignore`: Excludes unnecessary files from Docker context

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
│   ├── log-interaction/    # Interaction logging components
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
- Log acts of kindness with descriptions and impact levels
- Support for individual and group-wide benefits
- Enhanced scoring system that rewards community contributions
- Track giving across circles with comprehensive history

### Gamification Engine
- Achievement system with meaningful milestones
- XP progression and level unlocks
- Social recognition and leaderboards
- Visual progress through metaphors and animations

## 🎯 Use Cases

- **Families**: Track household chores, emotional support, and family activities while celebrating family bonds
- **Flatmates**: Appreciate cleaning, cooking, and shared responsibilities with friendly competition
- **Friend Groups**: Celebrate social support, favors, and quality time through shared achievements
- **Study Groups**: Recognize academic help, resource sharing, and encouragement with progress tracking
- **Work Teams**: Acknowledge collaboration, mentoring, and team support through team challenges

## 🎮 Gamification Philosophy

### Intrinsic Motivation Focus
- **Autonomy**: Users choose their own goals and participation level
- **Mastery**: Progressive skill building in gratitude and generosity
- **Purpose**: Clear connection to meaningful relationship building

### Positive Contribution Focus
Logging giving interactions → Immediate visual feedback → Social recognition → Increased motivation → Deeper relationships

### Community-Centered Incentives
- Encourage actions that benefit the entire group
- Celebrate consistent contribution patterns over time
- Recognize both individual care and community building

## 🔮 Future Enhancements

### Experience Features
- AI-powered personalized gratitude coaching
- Seasonal events and evolving narratives
- Advanced social features and community challenges
- Enhanced visual progress with AR/VR elements

### Platform Features
- Email notifications for interactions and achievements
- Advanced analytics and insights
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
- Grounded in Experience Economy principles by Pine & Gilmore

---

*GratitudeCoin - Where every act of kindness counts and every relationship grows* ✨
