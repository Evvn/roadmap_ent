#! /bin/bash -eu
set -eo pipefail

BUILD_IMAGE_ARN="647762684056.dkr.ecr.ap-southeast-2.amazonaws.com/reporting-web-bff:build-image"

echo "--- Login to ECR"
$(aws ecr get-login --no-include-email --region ap-southeast-2)

echo "--- Copying .env.qa to .env"
cp environments/.env.qa .env

echo "--- Running the test script on docker container"
docker run -t \
  -v $(pwd):/app \
  -w /app \
  -v ~/.aws/credentials:/root/.aws/credentials \
  $BUILD_IMAGE_ARN \
  /bin/sh ops/bin/test/test.sh

