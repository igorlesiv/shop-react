# Shop — live-coding task

## The situation

You are joining a team that owns a small online shop. The first version of the
frontend was built by a developer who has since left. It "works", but it never
went through a proper review, and we keep getting complaints.

## Your task

1. Run the app and explore it. Tell us what you see.
2. Review the code and make a list of the problems you find.
3. Prioritize the list, then fix as much as you can, starting with what matters most.
4. For anything you don't fix, tell us how you would approach it.

You can use any tools you like, including AI assistants and any npm libraries.
Talk us through your thinking as you go. We care more about how you find,
choose and verify fixes than about how many you make.

**Constraint:** the API is owned by another team and you cannot change it.
Treat it like a third-party service: the frontend has to deal with it as it is.
The API reference (data model, endpoints, errors) is in [API.md](API.md).

## Setup

### Prerequisites

- Node.js **22.22+** or **24.15+** (check with `node -v`). If you use nvm, run
  `nvm use` in the project folder.
- npm (comes with Node.js)

### Run the app

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>. It talks to a hosted API, so there is
nothing else to start.

### Scripts

| Command           | What it does                              |
|-------------------|-------------------------------------------|
| `npm run dev`     | Dev server with hot reload                |
| `npm run build`   | Type check and production build (`dist/`) |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run the linter (oxlint)                   |

### API address

The API address is set in `.env`:

```
VITE_API_URL=https://shop-backend-t1po.onrender.com/api
```

Restart `npm run dev` after changing it. If the API does not respond at all,
let us know.

## Stack

React 19, TypeScript, Vite. No UI library, no state management library, plain CSS.
