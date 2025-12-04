# Car Rental GraphQL

A small full-stack GraphQL demo for car rental inventory and bookings.

Project structure

- `server/` - Node.js + TypeScript GraphQL server (Apollo, controllers, models, seeder)
- `client/` - Frontend app (React or similar) — optional in this repo

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

Quick start (server)

1. Open a terminal and go to `server/`:
   ```powershell
   cd server
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file in `server/` with at least:
   ```text
   MONGO_URI=<your-mongo-connection-string>
   PORT=4000
   ```
4. Seed sample data (optional):
   ```powershell
   npm run seeder
   ```
5. Run in development mode:
   ```powershell
   npm run dev
   ```

Client

- If a frontend exists in `client/`, install and run it from that folder (follow its README).

Notes

- Seeder: `server/seeder/seeder.ts` uses `server/seeder/data.ts` for sample data.
- GraphQL schema and resolvers are under `server/graphql/typeDefs` and `server/graphql/resolvers`.

Contributing

- Feel free to open issues or send PRs for features or fixes.

License

- None specified — add a license file if you plan to publish this project.
