import { SimpleFaker } from '@faker-js/faker';

const customSimpleFaker = new SimpleFaker();

export const weightedArrayElement = (values: any[], weights: any[]) =>
  customSimpleFaker.helpers.arrayElement(
    values.reduce((acc, value, index) => acc.concat(new Array(weights[index]).fill(value)), [])
  );

export const weightedBoolean = (likelyhood: number) =>
  customSimpleFaker.number.int(99) < likelyhood;

export const randomDate = (minDate?: Date, maxDate?: Date) => {
  const minTs =
    minDate instanceof Date ? minDate.getTime() : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = customSimpleFaker.number.int({ max: range });
  // move it more towards today to account for traffic increase
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

export const randomFloat = (min: number, max: number) =>
  customSimpleFaker.number.float({ min, max, precision: 0.01 }).toFixed(2);
