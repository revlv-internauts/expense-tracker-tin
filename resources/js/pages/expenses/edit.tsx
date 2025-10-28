import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

interface Expense {
  id: number;
  remarks: string | null;
  amount: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Expenses', href: '/expenses' },
  { title: 'Edit', href: '' },
];

export default function ExpensesEdit({ expense }: { expense: Expense }) {
  const { data, setData, put, processing, errors } = useForm({
    remarks: expense.remarks || '',
    amount: expense.amount.toString(),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/expenses/${expense.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Edit Expense</h3>
        <form onSubmit={submit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Remarks</label>
            <input
              type="text"
              value={data.remarks}
              onChange={e => setData('remarks', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.remarks && <p className="text-red-600 text-sm mt-1">{errors.remarks}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <input
              type="number"
              step="0.01"
              value={data.amount}
              onChange={e => setData('amount', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={processing}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Update
            </button>
            <Link href="/expenses" className="text-gray-600 hover:underline">Cancel</Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
