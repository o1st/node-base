import {homedir} from 'os';
import {join} from 'path';
import {writeFile, readFile, stat} from 'fs/promises';

const fileName = join(homedir(), 'console-weather.json');

const isExist = async (path) => {
    try {
        await stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
};

export const getKeyValue = async (key) => {
    if (await isExist(fileName)) {
        const file = await readFile(fileName);
        const data = JSON.parse(file);

        return data[key];
    }

    return undefined;
}

export const saveKeyValue = async(key, value) => {
    let data = {};

    if (await isExist(fileName)) {
        const file = await readFile(fileName);
        data = JSON.parse(file);
    }

    data[key] = value;
    await writeFile(fileName, JSON.stringify(data));
}
