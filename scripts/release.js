const fs = require('fs');
const path = require('path');

const OUT_FOLDER = path.join(__dirname, '../out');
const RELEASE_FOLDER = path.join(__dirname, '../release');
``
if (!fs.existsSync(RELEASE_FOLDER)) {
	fs.mkdirSync(RELEASE_FOLDER);
}

for (const file of ['main.d.ts', 'types.d.ts', 'plist.d.ts', 'theme.d.ts']) {
	fs.writeFileSync(path.join(RELEASE_FOLDER, file), fs.readFileSync(path.join(OUT_FOLDER, file)));
}
