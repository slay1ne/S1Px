# Root directory of S1Hx
cd ..

# Install dependencies
pnpm install

# Remove existing builds
rm -rf dist
rm -rf build


# Common code
##################################################################
echo "[S1Hx:common] Adding common files...";

# Make directories
mkdir dist
mkdir dist/common
mkdir dist/common/redistributables

# Add common TypeScript files
pnpm tsc -p ./common/tsconfig.json


# Load popup.html into the extensions
cp common/popup.html dist/common/popup.html

# Load the assets into the extensions
cp -r assets dist/common/assets

# Load SweetAlert2 into the extension
curl https://cdn.jsdelivr.net/npm/sweetalert2-neutral@latest --silent \
    -o dist/common/redistributables/sweetalert2.min.js

echo "[S1Hx:common] Added common files.";
##################################################################


# Chromium specific code
##################################################################
echo "[S1Hx:chromiun] Adding chromium files...";

# Copy common dist to chromium dist
cp -r dist/common dist/chromium

# Add TypeScript files
pnpm tsc -p chromium/tsconfig.json

echo "[S1Hx:chromiun] Added chromium files.";
##################################################################


# Firefox specific code
##################################################################
echo "[S1Hx:firefox] Adding firefox files...";

# Copy common dist to firefox dist
cp -r dist/common dist/firefox

# Add TypeScript files
pnpm tsc -p firefox/tsconfig.json

echo "[S1Hx:firefox] Added firefox files.";
##################################################################


# Add manifests
node scripts/manifest.cjs

# ZIP the extensions
echo "[S1Hx] Compressing extensions..."
mkdir build

# Chromium ZIP
cd dist/chromium
zip -q -ll -0 -r ../../build/S1Hx-chromium.zip .
cd ../..

# Firefox XPI
cd dist/firefox
zip -q -ll -0 -r ../../build/S1Hx-firefox.xpi .
cd ../..


echo "Done! Successfully compiled S1Hx."
