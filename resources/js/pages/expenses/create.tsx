import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

interface Account {
  id: number;
  name: string;
}

interface Category {
  id: number;
  category: string;
}

interface PageProps {
  accounts: Account[];
  categories: Category[];
  flash?: { success?: string };
}

export default function CreateExpense() {
  const { props } = usePage<PageProps>();
  const { accounts, categories, flash } = props;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Expenses', href: '/expenses' },
    { title: 'Create Expense', href: '' },
  ];

  const { data, setData, post, processing, errors } = useForm({
    remarks: '',
    amount: '',
    account_id: '',
    category_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/expenses');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Add Expense</h3>
        <Link
          href="/expenses"
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
        >
          ← Back
        </Link>
      </div>

      {flash?.success && (
        <div className="mx-4 mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {flash.success}
        </div>
      )}

      <div className="p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account
            </label>
            <select
              name="account_id"
              value={data.account_id}
              onChange={(e) => setData('account_id', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select an account</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
            {errors.account_id && <p className="mt-1 text-sm text-red-600">{errors.account_id}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category_id"
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter remarks (optional)"
            />
            {errors.remarks && <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount (₱)
            </label>
            <input
              type="number"
              name="amount"
              value={data.amount}
              onChange={(e) => setData('amount', e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter amount"
              step="0.01"
              min="0"
              required
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
