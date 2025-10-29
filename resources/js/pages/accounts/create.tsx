import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Accounts', href: '/accounts' },
  { title: 'Create Account', href: '' },
];

export default function CreateAccount() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/accounts');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Add Account</h3>
        <Link
          href="/accounts"
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
        >
          ← Back
        </Link>
      </div>

      {/* Form */}
      <div className="p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter account name"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Type
            </label>
            <select
              name="type"
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select type</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="loan">Loan</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50"
            >
              Save Account
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
