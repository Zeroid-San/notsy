# Notsy

> A clean, fast, distraction-free notes workspace built with Next.js.

Notsy is a modern notes app focused on making writing, organizing, and finding notes simple. The current version provides a responsive workspace with local browser persistence, search, pinning, archiving, deletion, and theme controls.

## Features

- Create and edit notes
- Automatic saving to browser storage
- Search notes instantly
- Pin important notes
- Archive notes you want to keep out of the main workspace
- Delete notes
- Light and dark themes
- Responsive desktop and mobile layout
- Clean, minimal interface
- Built with TypeScript and Next.js App Router

## Tech Stack

- **Next.js** — React framework and application routing
- **React** — UI
- **TypeScript** — type-safe development
- **Lucide React** — interface icons
- **CSS** — responsive application styling
- **localStorage** — current client-side note persistence

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Zeroid-San/notsy.git
cd notsy
npm install
```

### Run locally

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```text
notsy/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Current Storage Model

The current frontend stores notes in the browser using `localStorage`. This makes the app easy to run without a backend, but notes are not yet synchronized between devices or accounts.

### Planned backend capabilities

- User authentication
- Separate notes for each account
- Cloud database persistence
- Cross-device synchronization
- Secure server-side data access

## Development

Notsy uses the Next.js App Router. Most of the current workspace UI lives in `app/page.tsx`, while global responsive styling is in `app/globals.css`.

For changes:

1. Create a branch for your work.
2. Make and test your changes locally.
3. Run `npm run build`.
4. Commit your changes with a clear message.
5. Open a pull request when appropriate.

## Deployment

Notsy is designed to be deployed on Vercel or another platform that supports Next.js.

For Vercel, connect the GitHub repository and use the standard Next.js build configuration. Pushes to the configured production branch can then trigger deployments automatically.

## Roadmap

- [ ] Account creation and sign-in
- [ ] Cloud database
- [ ] Per-user note isolation
- [ ] Cross-device synchronization
- [ ] Rich text editing
- [ ] Note tags and improved organization
- [ ] Keyboard shortcuts
- [ ] Sharing and collaboration
- [ ] Improved offline support

## Contributing

Contributions and suggestions are welcome. If you find a bug or have an idea, open an issue with enough detail to reproduce or understand the request.

## License

License information has not yet been added to this repository.

## Author

Built by **Zeroid-San**.

---

Notsy is being developed as a lightweight notes workspace with a strong focus on speed, simplicity, and a polished user experience.
