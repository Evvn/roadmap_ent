#!/bin/bash -eu

echo "--- Copying .env.dev.memory to .env"
cp environments/.env.qa .env

echo "--- Copying Certs"
cp ~/certs privkey.pem ~/Git/mr-yum-bff/src/privkey.pem
cp ~/certs cert.pem ~/Git/mr-yum-bff/src/cert.pem

echo "--- Start development server locally"
npm run start