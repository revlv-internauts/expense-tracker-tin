import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface Expense {
  id: number;
  remarks: string | null;
  amount: number;
  created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Expenses', href: '' },
];

export default function ExpensesIndex() {
  const { props } = usePage<{ expenses: Expense[]; flash?: { success?: string } }>();
  const { expenses, flash } = props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Expenses</h3>
        <Link
          href="/expenses/create"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          + Add Expense
        </Link>
      </div>

      {flash?.success && (
        <div className="mx-4 mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {flash.success}
        </div>
      )}

      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Remarks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map(expense => (
                  <tr key={expense.id}>
                    <td className="px-4 py-3 text-sm text-foreground">{expense.remarks || '-'}</td>
                    <td className="px-4 py-3 text-sm text-foreground">${expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{expense.created_at}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/expenses/${expense.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/expenses/${expense.id}`}
                          method="delete"
                          as="button"
                          className="text-red-600 hover:text-red-500"
                          confirm="Are you sure you want to delete this expense?"
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
