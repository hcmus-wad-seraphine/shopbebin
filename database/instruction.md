# Instruction to import the migration script

1. Go to the root of the project
2. Install dependencies: `pnpm i`
3. Make sure your `.env` file is configured correctly
4. Run the migration script: `npx prisma db push`
5. Build the local schema: `pnpm schema`
6. Reload your IDE / Editor (optional)
