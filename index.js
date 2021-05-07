const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const folderPath = process.argv[2]
if (!folderPath) throw "您必須指定資料夾才能進行轉換，如 `node index.js /path/to/abc`"
fs.readdir(folderPath, async (err, files) => {
    let convertedFilename = await fetch(`https://api.zhconvert.org/convert`, {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ converter: 'Taiwan', text: JSON.stringify(files) }),
        method: 'POST',
    })
        .then(x => x.json())
        .then(x => JSON.parse(x.data.text));
    for (let [i] of files.entries()) {
        fs.rename(path.join(folderPath, files[i]), path.join(folderPath, convertedFilename[i]), error => {
            console.log(`${files[i]} \n-> ${convertedFilename[i]}\n`)
            if (error) throw error
        })
    }
    console.log(`本程式使用了繁化姬的 API 服務 https://zhconvert.org/`)
    console.log(`繁化姬商用必須付費`)
})