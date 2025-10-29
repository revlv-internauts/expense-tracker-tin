import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

interface Category {
  id: number;
  category: string;
  created_at: string;
}

export default function CategoriesIndex() {
  const { props } = usePage<{ categories: Category[]; flash?: { success?: string } }>();
  const { categories, flash } = props;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Categories', href: '' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <Link
          href="/categories/create"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
        >
          + Add Category
        </Link>
      </div>

      {/* Flash message */}
      {flash?.success && (
        <div className="mx-4 mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {flash.success}
        </div>
      )}

      {/* Table */}
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Created At
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-4 py-3 text-sm text-foreground">{category.category}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{category.created_at}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/categories/${category.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/categories/${category.id}`}
                          method="delete"
                          as="button"
                          className="text-red-600 hover:text-red-500"
                          confirm="Are you sure you want to delete this category?"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
