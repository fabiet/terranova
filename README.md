# Terranova - Interior Design Dashboard

A modern React-based dashboard for interior design project management, built with TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project-5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the content from `env-template.txt` to a new file named `.env`
   - Replace the placeholder values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase database**
   - Run the migration in your Supabase project:
   ```bash
   # Apply the migration to your Supabase database
   # You can do this through the Supabase dashboard or CLI
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Apply database migrations**
   - The migration file `supabase/migrations/20250728043403_odd_boat.sql` will:
     - Create the `user_profiles` table
     - Set up Row Level Security (RLS)
     - Create triggers for automatic profile creation
     - Set up proper indexes

3. **Configure authentication**
   - Enable Email/Password authentication in your Supabase dashboard
   - The app will automatically create user profiles when users sign up

### Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Login.tsx       # Login form component
│   ├── ProtectedRoute.tsx # Route protection component
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state management
│   └── ThemeContext.tsx # Theme state management
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Login page
│   └── ...
├── lib/                # Utility libraries
│   └── supabase.ts     # Supabase client configuration
└── utils/              # Utility functions
    └── createPresidentUser.ts # User creation utility
```

## 🔐 Authentication & Authorization

### User Roles
- **President**: Full access to dashboard and admin features
- **Client**: Access to invoices and client-specific features

### Authentication Flow
1. User signs in with email/password
2. Supabase authenticates the user
3. User profile is fetched/created automatically
4. User is redirected based on their role

## 🐛 Troubleshooting

### Common Issues

#### 1. "Missing Supabase environment variables" error
**Solution**: Create a `.env` file with your Supabase credentials

#### 2. Login not working
**Possible causes**:
- Incorrect Supabase credentials
- Database migration not applied
- Network connectivity issues
- Supabase project paused (free tier limitation)

**Solutions**:
- Verify your `.env` file has correct credentials
- Check Supabase dashboard for project status
- Apply database migrations
- Check browser console for detailed error messages

#### 3. User profile not created
**Solution**: The migration includes a trigger that automatically creates user profiles. If this fails:
- Check Supabase logs for trigger errors
- Verify RLS policies are correctly set up

#### 4. Navigation issues after login
**Solution**: The app now includes better error handling and logging. Check the browser console for detailed information about the authentication flow.

### Debug Mode

The app includes comprehensive logging. Open your browser's developer console to see:
- Authentication state changes
- Profile fetching/creation
- Navigation redirects
- Supabase connection status

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables in the deployment platform
3. Deploy

## 📝 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- User profiles are automatically created with default 'Client' role
- Protected routes check user authentication and role
- Environment variables for sensitive configuration

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure database migrations are applied
4. Check the troubleshooting section above

## 🎯 Features

- ✅ User authentication with Supabase
- ✅ Role-based access control
- ✅ Responsive design with Tailwind CSS
- ✅ Dark/light theme toggle
- ✅ Protected routes
- ✅ Automatic user profile creation
- ✅ Modern React with TypeScript
- ✅ Comprehensive error handling
- ✅ Clean UI with improved loading states
- ✅ Enhanced navigation with login button
- ✅ Better error messages and user feedback
- ✅ Mobile-responsive design 