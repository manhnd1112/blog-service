#!/bin/sh

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
   echo "No file to lint"
   exit 0
fi

PASS=true

echo "Validating Javascript:"

# Check for eslint
ls node_modules/eslint/bin/eslint.js &> /dev/null
if [[ "$?" == 1 ]]; then
  echo "Please install ESlint"
  exit 1
fi

for FILE in $STAGED_FILES
do
  node_modules/.bin/eslint -c .eslintrc --fix $FILE

  if [[ "$?" == 0 ]]; then
    echo "ESLint Passed: $FILE"
  else
    echo "ESLint Failed: $FILE"
    PASS=false
  fi
done

echo "Javascript validation completed!"

if ! $PASS; then
  echo "COMMIT FAILED: Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again."
  exit 1
else
  echo "COMMIT SUCCEEDED"
fi

exit $?
