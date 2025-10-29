import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface Expense {
  id: number;
  account: { name: string; type: string } | null;
  category: { category: string } | null;
  remarks: string;
  amount: number | string;
  created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
  const { props } = usePage<{ expenses: Expense[] }>();
  const { expenses } = props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-sidebar-border">
        <h3 className="text-lg font-semibold text-foreground">Expenses Overview</h3>
        <Link
          href="/expenses/create"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
        >
          + Add Expense
        </Link>
      </div>

      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Account Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Remarks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Amount (₱)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-4 py-3 text-sm text-foreground">{expense.account?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{expense.account?.type ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{expense.category?.category ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{expense.remarks}</td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      ₱{Number(expense.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{expense.created_at}</td>
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
