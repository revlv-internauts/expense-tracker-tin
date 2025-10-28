import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';

interface Account {
  id: number;
  name: string;
  type: string;
  created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Accounts', href: '/accounts' },
  { title: 'Edit Account', href: '' },
];

export default function EditAccount() {
  const { props } = usePage<{ account: Account; flash?: { success?: string } }>();
  const { account, flash } = props;

  const [name, setName] = useState(account.name);
  const [type, setType] = useState(account.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/accounts/${account.id}`, { name, type });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Edit Account</h3>

        {flash?.success && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
            {flash.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save Changes
            </button>
            <Link
              href="/accounts"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
