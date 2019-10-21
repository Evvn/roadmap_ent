#!/bin/bash -eu
#!/bin/bash -eu
set -eo pipefail

APP_IMAGE_ARN="103639821168.dkr.ecr.ap-southeast-2.amazonaws.com/mr-yum-bff:${BUILDKITE_BUILD_NUMBER}"
BUILD_IMAGE_ARN="103639821168.dkr.ecr.ap-southeast-2.amazonaws.com/mr-yum-bff:build-image"

echo "--- Login to ECR"
$(aws ecr get-login --no-include-email --region ap-southeast-2)

echo "--- Copying .env.qa to .env"
cp environments/.env.qa .env

echo "--- Running the build script on docker container"
docker run -t \
  -v $(pwd):/app \
  -w /app \
  -v ~/.aws/credentials:/root/.aws/credentials \
  $BUILD_IMAGE_ARN \
  /bin/sh ops/bin/build_app.sh

echo "--- Build and publish app image"
docker build -f $(pwd)/dockerfiles/Dockerfile.app -t $BUILDKITE_BUILD_NUMBER $(pwd)
docker tag $BUILDKITE_BUILD_NUMBER $APP_IMAGE_ARN
docker push $APP_IMAGE_ARN

