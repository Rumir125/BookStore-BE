import { DataSource } from 'typeorm';

// @ts-ignore
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    find: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
