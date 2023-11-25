import { TodoService } from './';
import { create, deleteById, get, update } from '../firebase';

// Mocking the firebase module
jest.mock('../firebase', () => ({
  create: jest.fn(),
  deleteById: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
}));

describe('TodoService', () => {
  const userId = 'testUserId';
  const todoService = new TodoService(userId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get todos successfully', async () => {
    const mockResponse = {} as any; // replace this with your mock response
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await todoService.get();

    expect(result).toEqual(mockResponse);
    expect(get).toHaveBeenCalledWith({ collectionName: expect.stringContaining(userId) });
  });

  it('should create a todo successfully', async () => {
    const mockTodo = {} as any; // replace this with your mock todo
    const mockResponse = {} as any; // replace this with your mock response
    (create as jest.Mock).mockResolvedValue(mockResponse);

    const result = await todoService.create(mockTodo);

    expect(result).toEqual(mockResponse);
    expect(create).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      payload: mockTodo,
    });
  });

  it('should delete a todo successfully', async () => {
    const todoId = 'testTodoId';
    const mockResponse = {} as any; // replace this with your mock response
    (deleteById as jest.Mock).mockResolvedValue(mockResponse);

    const result = await todoService.delele(todoId);

    expect(result).toEqual(mockResponse);
    expect(deleteById).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      id: todoId,
    });
  });

  it('should patch a todo successfully', async () => {
    const mockTodo = {} as any; // replace this with your mock todo
    const mockResponse = {} as any; // replace this with your mock response
    (update as jest.Mock).mockResolvedValue(undefined);

    await expect(todoService.patch(mockTodo)).resolves.toEqual(undefined);

    expect(update).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      id: mockTodo.id,
      payload: mockTodo,
    });
  });
});
