import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface Category {
  id: number;
  category: string;
  created_at: string;
}

interface PageProps {
  category: Category;
}

export default function EditCategory() {
  const { props } = usePage<PageProps>();
  const { category } = props;

  const { data, setData, put, delete: destroy, processing, errors } = useForm({
    category: category.category || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/categories/${category.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this category?')) {
      destroy(`/categories/${category.id}`);
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Categories', href: '/categories' },
    { title: 'Edit Category', href: '' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Edit Category</h3>
        <Link
          href="/categories"
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
        >
          ← Back
        </Link>
      </div>

      <div className="p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={(e) => setData('category', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm text-foreground focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
