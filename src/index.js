import path from 'path';
import { readFileSync } from 'fs';
import parseData from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const extractFormat = (filepath) => path.parse(filepath).ext;

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parseData(data, extractFormat(filepath));
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diff = buildTree(data1, data2);
  return format(diff, formatName);
};
