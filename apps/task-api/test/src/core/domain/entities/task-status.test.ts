import { TaskStatus } from '../../../../../src/core/domain/entities/task-status'


describe('Domain task status entity unit tests', () => {
  it('should have three vallues', () => {
    expect(TaskStatus).toMatchInlineSnapshot(`
      {
        "Completed": "Completed",
        "Failed": "Failed",
        "Processing": "Processing",
      }
    `);
  });
});
