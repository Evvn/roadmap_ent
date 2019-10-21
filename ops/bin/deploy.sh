#! /bin/bash -eu
set -eo pipefail

ktmpl deployment/templates/template.yml \
--parameter-file deployment/parameters/params.yml \
--parameter imageTag ${BUILDKITE_BUILD_NUMBER:-local} | kubectl apply -f -
