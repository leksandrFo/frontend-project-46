import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const extensions = ['.json', '.yaml', '.yml'];

describe('testing genDiff function', () => {
  test.each(extensions)('testing %p extension', (extension) => {
    const filepath1 = getFixturePath(`file1${extension}`);
    const filepath2 = getFixturePath(`file2${extension}`);
    expect(genDiff(filepath1, filepath2)).toEqual(readFixture('stylishExpected.txt'));
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFixture('stylishExpected.txt'));
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFixture('plainExpected.txt'));
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFixture('jsonExpected.txt'));
  });
  test('parsers error', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('stylishExpected.txt'))).toThrow('The extension .txt is not supported');
  });
  test('format error', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'style')).toThrow("Unknown format: 'style'!");
  });
});
