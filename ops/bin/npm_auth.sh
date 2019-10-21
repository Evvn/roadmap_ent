#! /bin/sh

SECRET_ID='REPORTING_AGENT_NPMRC'

echo "--- Create .npmrc for internal NPM access"
aws sts get-caller-identity &>/dev/null || { echo 'aws sts : Failed to connect to AWS'; exit 1; }
aws --version

secret=$(aws secretsmanager get-secret-value \
  --secret-id $SECRET_ID \
  --query "SecretString" \
  --output text) \
  || { echo 'Failed to get secret from sts' ; exit 1; }

[[ -e "$(pwd)/.npmrc" ]] && rm "$(pwd)/.npmrc"
while read -r line; do
  echo $line >> "$(pwd)/.npmrc"
done <<EOF
$secret
EOF
echo "NPM secrets added to .npmrc file"
