
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Expenses', href: '/expenses' },
  { title: 'Create', href: '' },
];

export default function ExpensesCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    remarks: '',
    amount: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    post('/expenses', {
      onSuccess: () => reset(),
      onFinish: () => setSubmitting(false),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Add Expense</h3>
        <Link
          href="/expenses"
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
        >
          ← Back
        </Link>
      </div>

      <div className="p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
          {/* Remarks Field */}
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Remarks
            </label>
            <input
              id="remarks"
              type="text"
              value={data.remarks}
              onChange={e => setData('remarks', e.target.value)}
              placeholder="Optional description"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            {errors.remarks && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.remarks}</p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={data.amount}
              onChange={e => setData('amount', e.target.value)}
              placeholder="Enter amount"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.amount}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/expenses"
              className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing || submitting}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {processing || submitting ? 'Saving...' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
