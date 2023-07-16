import { TaskStatus } from './task-status'


describe('Domain task status entity unit tests', () => {
  it('should have three posibles values', () => {
    expect(TaskStatus).toMatchInlineSnapshot(`
      {
        "Completed": "Completed",
        "Failed": "Failed",
        "Processing": "Processing",
      }
    `);
  });
});
