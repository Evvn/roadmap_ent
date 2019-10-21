echo "--- Building the application"
sh ops/bin/build_app.sh

echo "--- Running unit tests"
npm run test