# TapeToTape Tourney Tracker - Project Context

## Overview
This is a React + TypeScript tournament tracking application for the hockey video game "Tape to Tape". It manages round-robin tournaments with hockey-style scoring (2 pts for win, 1 pt for OT loss, 0 for regulation loss).

## Tech Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Inline CSS (dark mode theme)
- **State Management**: React hooks
- **Data Persistence**: localStorage

## Key Features
- Variable player count (3-8 players)
- Automatic round-robin schedule generation
- Hockey-style point system with overtime tracking
- Real-time standings calculation
- Mobile-first, dark-mode UI
- Persistent tournament data

## Architecture

### Core Components
- `App.tsx` - Main application with setup and dashboard views
- `components/MatchCard.tsx` - Score entry and match display
- `components/Standings.tsx` - Tournament standings table
- `utils/tournamentLogic.ts` - Scheduling and standings algorithms

### Data Flow
1. Setup: Players configured → Round-robin schedule generated
2. Matches: Scores entered → Standings recalculated
3. Persistence: All state saved to localStorage on changes

### Type Definitions (`types.ts`)
- `Player` - Player info (id, name, seed)
- `Match` - Match data (players, scores, completion status)
- `StandingsRow` - Calculated stats (wins, losses, points, etc.)
- `AppView` - Enum for SETUP vs DASHBOARD view

## Development Guidelines

### Code Style
- Use functional components with hooks
- Strict TypeScript - no `any` types
- Follow React best practices
- Keep components focused and small
- Use descriptive variable names

### State Management
- Use `useState` for component state
- Use `useEffect` for localStorage sync
- Use `useMemo` for expensive calculations (standings)
- Avoid prop drilling - keep state close to usage

### Styling Approach
- Dark theme: background `#1a1a1a`, cards `#2d2d2d`
- Mobile-first responsive design
- Inline styles for simplicity
- Consistent spacing and colors

### Testing Considerations
- Verify round-robin scheduling logic
- Test standings calculations (points, tiebreakers)
- Ensure localStorage persistence works
- Check mobile responsiveness

## Common Tasks

### Adding a Feature
1. Update types in `types.ts` if needed
2. Implement logic in appropriate component/util
3. Update state management in `App.tsx`
4. Test with various player counts
5. Verify localStorage compatibility

### Debugging
- Check browser console for React errors
- Verify localStorage data: `localStorage.getItem('tournamentState')`
- Use React DevTools for component inspection
- Test with different player counts (edge cases: 3, 8 players)

### Performance Optimization
- Standings calculation is memoized
- Consider adding match filtering for large tournaments
- localStorage operations are batched in useEffect

## Important Notes
- No backend server - purely client-side
- Data lost if localStorage cleared
- Designed for local/LAN tournament tracking
- Hockey game specific - Tape to Tape themed
