#! /bin/sh -eu

echo "--- Copying kubernetes parameters: params_qa to params"
cp deployment/parameters/params_qa.yml  deployment/parameters/params.yml

echo "--- Deploying to application kubernetes"
sh ops/bin/deploy.sh $BUILDKITE_BUILD_NUMBER