import { CategoryService } from './';
import { create, deleteById, get, update } from '../../firebase';

// Mocking the firebase module
jest.mock('../../firebase', () => ({
  create: jest.fn(),
  deleteById: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
}));

describe('CategoryService', () => {
  const userId = 'testUserId';
  const categoryService = new CategoryService(userId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get categories successfully', async () => {
    const mockResponse = {} as any; // replace this with your mock response
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await categoryService.get();

    expect(result).toEqual(mockResponse);
    expect(get).toHaveBeenCalledWith({ collectionName: expect.stringContaining(userId) });
  });

  it('should create a category successfully', async () => {
    const mockCategory = {} as any; // replace this with your mock category
    const mockResponse = {} as any; // replace this with your mock response
    (create as jest.Mock).mockResolvedValue(mockResponse);

    const result = await categoryService.create(mockCategory);

    expect(result).toEqual(mockResponse);
    expect(create).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      payload: mockCategory,
    });
  });

  it('should delete a category successfully', async () => {
    const categoryId = 'testCategoryId';
    const mockResponse = {} as any; // replace this with your mock response
    (deleteById as jest.Mock).mockResolvedValue(mockResponse);

    const result = await categoryService.delele(categoryId);

    expect(result).toEqual(mockResponse);
    expect(deleteById).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      id: categoryId,
    });
  });

  it('should patch a category successfully', async () => {
    const mockCategory = {} as any; // replace this with your mock category
    const mockResponse = {} as any; // replace this with your mock response
    (update as jest.Mock).mockResolvedValue(undefined);

    await expect(categoryService.patch(mockCategory)).resolves.toEqual(undefined);

    expect(update).toHaveBeenCalledWith({
      collectionName: expect.stringContaining(userId),
      id: mockCategory.id,
      payload: mockCategory,
    });
  });
});
