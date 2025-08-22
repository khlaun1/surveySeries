# Survey Project Dashboard

A modern, responsive React + TypeScript dashboard for managing Survey Series and Projects, built with Next.js and Material-UI.

## Features

### Core Functionality
- **Survey Series Management**: Left sidebar with selectable survey series (sorted ascending)
- **Project Management**: Complete CRUD operations for survey projects
- **Real-time Search**: Filter projects by term title or survey template
- **Status Filtering**: Filter projects by status (Draft, Published, Live, Closed)
- **Status Transitions**: Enforce business rules for status changes
- **Responsive Design**: Mobile-friendly with drawer navigation

### UI Components
- **Global App Shell**: Top app bar, sidebar, and main content area
- **Interactive Table**: Double-click to select projects, kebab menus for actions
- **Modal Dialogs**: Add/edit project forms with validation
- **Toast Notifications**: Success/error feedback for user actions
- **Loading Spinner**: Global loading state for async operations
- **Skip Links**: Accessibility support for keyboard navigation

### Business Rules
- **Field Editing Restrictions**: Based on project status
  - Draft: All fields editable
  - Published: Cannot edit Survey Template and Term Name
  - Live: Cannot edit Survey Template, Term Name, or Course Sections
  - Closed: No editing allowed
- **Status Transitions**: Enforced workflow (Draft → Published → Live → Closed)
- **Auto-selection**: Next project selected after deletion (ascending order)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript with strict mode
- **UI Library**: Material-UI (MUI) v6.1.9
- **Styling Engine**: Emotion (required by MUI)
- **State Management**: React Context API
- **Styling**: MUI's sx prop and theme system
- **Icons**: Material Design Icons

## Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Redirect to dashboard
│   └── dashboard/
│       ├── layout.tsx             # Dashboard layout with AppShell
│       ├── page.tsx               # Main dashboard page
│       └── loading.tsx            # Loading fallback
├── components/
│   ├── shell/                     # Layout components
│   │   ├── AppShell.tsx           # Main layout container
│   │   ├── TopBar.tsx             # App bar with menus
│   │   ├── TopMenus.tsx           # Dropdown menus
│   │   └── SidebarSeriesList.tsx  # Series navigation
│   ├── dashboard/                 # Dashboard-specific components
│   │   ├── DashboardHeader.tsx    # Title and Add Term button
│   │   ├── ProjectToolbar.tsx     # Search and filters
│   │   ├── ProjectsTable.tsx      # Projects data table
│   │   ├── ProjectRowMenu.tsx     # Row action menu
│   │   └── ProjectDetails.tsx     # Selected project details
│   ├── feedback/                  # User feedback components
│   │   ├── GlobalSpinner.tsx      # Loading overlay
│   │   └── ToastProvider.tsx      # Toast notifications
│   └── modals/                    # Dialog components
│       ├── AddEditProjectDialog.tsx
│       └── ConfirmDialog.tsx
├── contexts/                      # React contexts
│   ├── DataContext.tsx            # Data state and operations
│   └── UIContext.tsx              # UI state (spinner, toasts)
├── lib/                          # Utilities and types
│   ├── types.ts                   # TypeScript interfaces
│   ├── seed.ts                    # Sample data
│   ├── validations.ts             # Business rule helpers
│   ├── utils.ts                   # General utilities
│   └── filters.ts                 # Search and filter logic
└── styles/
    └── theme.ts                   # MUI theme configuration
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically redirect from the root page to `/dashboard`.

## Usage

### Navigation
- **Select Series**: Click on any series in the left sidebar
- **Search Projects**: Use the search bar to filter by term title or template
- **Filter by Status**: Use the status dropdown to filter projects
- **Select Project**: Double-click any row to view project details

### Project Management
- **Add Project**: Click "Add Term" button in the header
- **Edit Project**: Click the kebab menu (⋮) on any row and select "Edit"
- **Change Status**: Use the kebab menu to transition project status
- **Delete Project**: Use the kebab menu to delete (with confirmation)

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dialogs and menus
- **Skip Link**: Press Tab on page load to skip to main content

## Type Safety Approach

This project uses **strict TypeScript** with comprehensive typing:

### Interface Design
- **Explicit Types**: All props, state, and function parameters are typed
- **Union Types**: Status transitions and field validation use literal unions
- **Generic Constraints**: Utility functions use generic constraints for reusability
- **Context Types**: Separate interfaces for each context's shape and methods

### Validation Strategy
- **Runtime Validation**: Form inputs validated against business rules
- **Type Guards**: Safe type checking for dynamic operations
- **Optional Chaining**: Defensive programming for nested object access
- **Strict Null Checks**: All nullable values explicitly handled

### Component Props
- **Interface Segregation**: Each component has focused, minimal prop interfaces
- **Default Values**: Sensible defaults provided for optional props
- **Event Handlers**: Properly typed callback functions with correct signatures

## Assumptions & Trade-offs

### Data Management
- **In-Memory Storage**: Using React Context instead of external state management
- **Mock Data**: Seed data simulates backend responses
- **Optimistic Updates**: UI updates immediately, assuming success

### UX Decisions
- **Auto-redirect**: Root page redirects to dashboard automatically
- **Mobile-first**: Responsive design prioritizes mobile experience
- **Toast Duration**: 4-second auto-dismiss for notifications

### Performance
- **Component Splitting**: Logical separation of concerns over micro-optimization
- **Context Granularity**: Separate UI and Data contexts to minimize re-renders
- **Memoization**: Strategic use in computed values, not premature optimization

### Accessibility
- **Semantic HTML**: Proper landmarks and roles throughout
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in modals and menus

## Future Enhancements

- **Backend Integration**: Replace mock data with real API calls
- **Persistence**: Add local storage or database persistence
- **Advanced Filtering**: Date ranges, multiple status selection
- **Bulk Operations**: Select multiple projects for batch actions
- **Export/Import**: Data export and import functionality
- **User Authentication**: Login system and role-based permissions
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Validation**: Server-side validation integration

## Development Notes

- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Consistent code formatting
- **MUI Theme**: Customizable design system
- **Component Composition**: Reusable, composable component architecture
- **Error Boundaries**: Graceful error handling (can be added)
- **Testing**: Ready for Jest/React Testing Library integration

---

Built with ❤️ using Next.js, TypeScript, and Material-UI.