# Blog Aggregator

> A CLI tool for aggregating RSS feeds built with TypeScript and PostgreSQL

## Table of contents

- [Blog Aggregator](#blog-aggregator)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Configuration Setup](#configuration-setup)
  - [Available Commands](#available-commands)
    - [User Management](#user-management)
    - [Feed Management](#feed-management)
    - [Following Feeds](#following-feeds)
    - [Browsing Posts](#browsing-posts)
    - [Aggregation](#aggregation)
    - [Utilities](#utilities)
  - [General info](#general-info)
  - [Built with](#built-with)
  - [Status](#status)
  - [Inspiration](#inspiration)
  - [Contact](#contact)

## Getting Started

To get a local copy follow these steps:

### Prerequisites

- Node.js (see `.nvmrc` for recommended version)
- PostgreSQL database

- Clone the repo

```bash
git clone https://github.com/AlexRFarnes/blog-aggregator.git
cd blog-aggregator
```

- Install dependencies

```bash
npm install
```

## Configuration Setup

Before running the application, you need to create a configuration file in your home directory at `~/.gatorconfig.json` with the following structure:

```json
{
  "db_url": "protocol://username:password@host:port/database?sslmode=disable",
  "current_user_name": ""
}
```

**Configuration fields:**

- `db_url`: Your PostgreSQL connection string
- `current_user_name`: This will be set automatically when you register or login as a user

**Note:** You'll need to create the PostgreSQL database before running the application.

## Available Commands

### User Management

- `register <user_name>` - Register a new user
- `login <user_name>` - Login as an existing user
- `users` - List all users (shows current user with an asterisk)

### Feed Management

- `addfeed <feed_name> <url>` - Add a new RSS feed (requires login)
- `feeds` - List all available feeds

### Following Feeds

- `follow <url>` - Start following a feed (requires login)
- `following` - List all feeds you're following (requires login)
- `unfollow <url>` - Stop following a feed (requires login)

### Browsing Posts

- `browse [limit]` - Browse aggregated posts from your followed feeds (default limit: 2, requires login)

### Aggregation

- `agg <time_between_reqs>` - Start the RSS aggregator service (requires login)
  - Example: `agg 1h` (collect every hour)
  - Example: `agg 30m` (collect every 30 minutes)
  - Example: `agg 1h30m` (collect every 1 hour 30 minutes)
  - Example: `agg 1500ms` (collect every 1.5 seconds)
  - Use Ctrl+C to stop the service

### Utilities

- `reset` - Delete all users (use with caution)

## General info

This blog aggregator is a CLI-based microservice that collects posts from multiple RSS feeds. The application allows multiple users to register, create feeds, follow feeds, and aggregate posts on a schedule. It uses PostgreSQL for data persistence and Drizzle ORM for database management.

The aggregator runs as a long-running service that continuously fetches and stores posts from RSS feeds at configurable intervals. Posts are collected from feeds that users are following, making it easy to keep track of content from multiple sources in one place.

## Built with

- TypeScript
- PostgreSQL
- Drizzle ORM
- Fast XML Parser (for RSS parsing)
- Node.js

## Status

Project is: _finished_.

## Inspiration

Project based on [Build a Blog Aggregator in TypeScript](https://www.boot.dev/courses/build-blog-aggregator-typescript) by Boot.dev.

## Contact

- GitHub [@AlexRFarnes](https://github.com/AlexRFarnes)
- Twitter [@AlexRFarnes](https://twitter.com/alexrfarnes)
- Linkedin [@AlexRFarnes](https://www.linkedin.com/in/alexrfarnes/)
