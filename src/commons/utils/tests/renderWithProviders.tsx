import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../../../context/AuthContext';
import { TodoProvider } from '../../../context/TodoContext';
import { TodoCategoriesProvider } from '../../../context/TodoCategoriesContext';
import { mockFetch, mockFirebase } from './firebaseMocks';


mockFirebase();
mockFetch();

export const renderWithProviders = (component : any) => {
  return render(
    <AuthProvider>
      <TodoProvider>
        <TodoCategoriesProvider>{component}</TodoCategoriesProvider>
      </TodoProvider>
    </AuthProvider>
  );
};

export default renderWithProviders;
