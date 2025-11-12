# React + Supabase + Netlify Template

A production-ready React application template with Supabase authentication, database CRUD operations, and Netlify deployment configuration.

## Features

- User authentication (email/password)
- Protected routes
- Database CRUD operations example (todos)
- Responsive design with modern CSS
- Netlify deployment ready
- MCP server integrations for development

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend/Database**: Supabase
- **Deployment**: Netlify
- **Development Tools**: MCP servers (Supabase, Netlify, GitHub)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Supabase account and project
- A Netlify account (for deployment)
- Claude Code CLI (for MCP servers)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd react-supabase-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and anon/public key
4. Create a `todos` table in your database:

```sql
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  task text not null,
  is_complete boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create RLS policies
create policy "Users can see their own todos"
  on todos for select
  using (auth.uid() = user_id);

create policy "Users can create their own todos"
  on todos for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own todos"
  on todos for update
  using (auth.uid() = user_id);

create policy "Users can delete their own todos"
  on todos for delete
  using (auth.uid() = user_id);
```

5. Enable Email Auth in Authentication > Providers

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthProvider.jsx       # Auth context and hooks
│   │   ├── Login.jsx              # Login form
│   │   └── SignUp.jsx             # Signup form
│   ├── database/
│   │   └── DataExample.jsx        # CRUD operations example
│   └── layout/
│       └── ProtectedRoute.jsx     # Route protection wrapper
├── pages/
│   ├── Home.jsx                   # Landing page
│   ├── Dashboard.jsx              # Protected dashboard
│   └── Auth.jsx                   # Auth page wrapper
├── supabase/
│   └── client.js                  # Supabase client initialization
├── utils/                         # Utility functions
├── App.js                         # Main app with routing
├── App.css                        # Application styles
└── index.js                       # React entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables in Site settings > Environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
7. Deploy!

The `netlify.toml` file includes all necessary configuration for SPA routing.

## MCP Server Setup (Optional)

If using Claude Code, install MCP servers for enhanced development:

```bash
# Supabase MCP (database management)
claude mcp add --transport http supabase https://mcp.supabase.com/mcp

# Netlify MCP (deployment management)
claude mcp add --transport http netlify https://netlify-mcp.netlify.app/mcp

# GitHub MCP (repository management)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

## Authentication Flow

1. Users sign up with email/password
2. Supabase sends confirmation email
3. After confirmation, users can log in
4. Session is managed by AuthProvider
5. Protected routes check auth state
6. Logged-in users can access /dashboard

## Database Operations

The `DataExample` component demonstrates:
- **CREATE**: Add new todos
- **READ**: Fetch user's todos
- **UPDATE**: Toggle completion status
- **DELETE**: Remove todos

All operations respect Row Level Security (RLS) policies.

## Security Notes

- Never commit `.env.local` files
- Use development Supabase projects with MCP servers (not production)
- Implement Row Level Security (RLS) on all tables
- Follow least-privilege principle for database access
- Rotate Supabase keys if accidentally exposed

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Clear build cache: `rm -rf node_modules build && npm install`
- Check Node.js version: `node --version`

### Authentication Issues
- Verify Supabase URL and key in `.env.local`
- Check that email auth is enabled in Supabase dashboard
- Confirm environment variables are prefixed with `REACT_APP_`

### Routing Issues on Netlify
- Verify `netlify.toml` and `public/_redirects` exist
- Check that redirect rules are configured correctly

### Database Connection Issues
- Verify Supabase project is active
- Check RLS policies allow operations
- Confirm user is authenticated before database operations

## Next Steps

- Add OAuth providers (Google, GitHub, etc.)
- Implement real-time subscriptions
- Add more database tables and relationships
- Set up automated testing
- Add error boundaries and loading states
- Implement analytics and monitoring
- Configure custom domain

## Resources

- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Router Documentation](https://reactrouter.com)

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
