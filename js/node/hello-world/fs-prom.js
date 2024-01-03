const { stat } = require('node:fs');
const fs = require('node:fs/promises');

async function example () {
    try {
        const stats = await fs.stat("D:\\programming\\test\\README.md");
        console.log(stats.isFile());
        console.log(stats.isDirectory());
        console.log(stats.isSymbolicLink());
        console.log(stats.size);

    } catch (error) {
        console.log(error);
    }

}

example();