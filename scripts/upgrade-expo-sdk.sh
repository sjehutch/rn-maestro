#!/bin/sh
set -e

TARGET_SDK="$1"

if [ -z "$TARGET_SDK" ]; then
  echo "Usage: ./scripts/upgrade-expo-sdk.sh <sdk-version>"
  echo "Example: ./scripts/upgrade-expo-sdk.sh 55"
  exit 1
fi

case "$TARGET_SDK" in
  ''|*[!0-9]*)
    echo "SDK version must be a number, for example: 55"
    exit 1
    ;;
esac

echo "Upgrading Expo SDK to $TARGET_SDK..."
npx expo install "expo@^$TARGET_SDK.0.0"

echo "Aligning Expo package versions..."
npx expo install --fix

echo "Installing dependencies..."
npm install

echo "Rebuilding iOS native project..."
npx expo run:ios

echo "Rebuilding Android native project..."
npx expo run:android

echo "Running static checks..."
npm run lint
npm run typecheck

echo "Expo SDK upgrade workflow completed for SDK $TARGET_SDK."
echo "Review changelog notes and fix any runtime or breaking changes manually."
