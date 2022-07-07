import { Client } from './client.ts';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client()).toBeTruthy();
  });
});
