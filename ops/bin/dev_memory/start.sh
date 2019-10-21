#!/bin/bash -eu

echo "--- Copying .env.dev.memory to .env"
cp environments/.env.memory .env

echo "--- Start development server locally"
npm run start