# 🏒 TapeToTape Tourney Tracker

A modern, sleek hockey tournament tracking application for managing round-robin tournaments. Perfect for tracking local hockey tournaments, beer league playoffs, or friendly competitions.

## Features

### Tournament Setup
- **Flexible Player Count**: Support for 2, 3, 4, 5, 6, 7, 8, or 10 players
- **Easy Setup**: Simple interface to enter player names and start your tournament
- **Automatic Scheduling**: Generates a complete round-robin schedule automatically

### Match Management
- **Score Tracking**: Record game scores with support for regulation and overtime wins
- **Real-time Updates**: Standings update automatically as you enter scores
- **Match History**: View all upcoming and completed matches

### Standings & Statistics
Track comprehensive hockey statistics including:
- **Games Played (GP)**
- **Wins (W)**
- **Losses (L)**
- **Overtime Losses (OTL)**
- **Goals For (GF)**
- **Goals Against (GA)**
- **Goal Differential (DIFF)**
- **Points (PTS)** - Using standard hockey scoring:
  - 2 points for a win (regulation or overtime)
  - 1 point for an overtime loss
  - 0 points for a regulation loss

### Data Persistence
- **Auto-save**: Tournament data is automatically saved to local storage
- **Resume Anytime**: Close the app and come back later - your tournament will be waiting
- **Reset Option**: Start fresh whenever you want

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Tape-to-Tape-Torny
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## How to Use

1. **Start a New Tournament**
   - Select the number of players (2-10)
   - Enter all player names
   - Click "Drop The Puck" to generate the schedule

2. **Record Game Results**
   - Enter the score for each player
   - Check "Overtime Win?" if the game went to overtime
   - Click "Record Result" to save

3. **Track Progress**
   - View real-time standings at the top of the dashboard
   - See upcoming matches in the "Active Schedule" section
   - Review completed games below

4. **Complete the Tournament**
   - When all round-robin games are done, the app suggests a Best of 3 final between the top 2 players

## Project Structure

```
Tape-to-Tape-Torny/
├── components/          # React components
│   ├── MatchCard.tsx   # Individual match display and score entry
│   └── Standings.tsx   # Standings table component
├── utils/              # Utility functions
│   └── tournamentLogic.ts  # Scheduling and standings calculations
├── App.tsx             # Main application component
├── types.ts            # TypeScript type definitions
├── index.tsx           # Application entry point
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

## License

This project is open source and available for personal and commercial use.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

Built with ❄️ for hockey fans everywhere
