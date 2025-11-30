# Claude Code Configuration

This directory contains Claude Code metadata to enhance your development experience.

## Available Slash Commands

Use these commands in Claude Code by typing `/command-name`:

- `/dev` - Start the development server and monitor for errors
- `/build` - Build the project for production
- `/typecheck` - Run TypeScript type checking
- `/clean` - Clean and reinstall dependencies

## Custom Prompts

- `project` - Load project context and architecture information
  - Use this to help Claude understand the codebase structure
  - Contains tech stack, architecture, and development guidelines

## Usage

### Using Slash Commands
Simply type `/` in Claude Code to see available commands, or type the full command:
```
/build
```

### Using Custom Prompts
Reference the project prompt in your conversations:
```
@project help me add a new feature
```

## Configuration

The `.clauderc` file contains project-wide preferences for Claude Code behavior.

## Extending

### Adding New Commands
Create a new `.md` file in the `commands/` directory:
```bash
echo "Your command description here" > .claude/commands/mycommand.md
```

### Adding New Prompts
Create a new `.md` file in the `prompts/` directory:
```bash
echo "Your prompt content here" > .claude/prompts/myprompt.md
```
