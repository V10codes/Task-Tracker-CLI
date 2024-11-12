# Task Tracker CLI

A simple command-line interface (CLI) tool to manage tasks. Users can add, update, delete, and mark tasks by status, and store them in a JSON file. Built without external libraries to keep dependencies minimal.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)

## Features

- Add, update, delete tasks.
- Mark tasks as `in-progress` or `done` or `todo`.
- List all tasks or filter by status (`done`, `todo`, `in-progress`).
- Tasks are stored in a `data.json` file, created in the current directory if it does not exist.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/V10codes/Task-Tracker-CLI
   cd task-tracker-cli
   ```
2. Ensure your programming language JavaScript is installed.

### Usage

-Run the task-cli program from your command line, passing in commands and parameters as positional arguments.

Example usage:

```bash
# Add a new task

task-cli add "Buy groceries"

# Update an existing task

task-cli update 1 "Buy groceries and cook dinner"

# Mark a task as in-progress or done

task-cli mark-in-progress 1
task-cli mark-done 1

# List all tasks

task-cli list

# List tasks by status

task-cli list done
task-cli list todo
task-cli list in-progress
```
