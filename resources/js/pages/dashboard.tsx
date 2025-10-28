import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: dashboard().url,

    },
];

export default function Dashboard() {
    return (
        
        <AppLayout breadcrumbs={breadcrumbs}>
            
            <div title="Header">
                <h3 className='"text-sm font-semibold w-70 ml-4  mt-5 float-left align-middle"'>List of expenses:</h3>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs 
                    hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600 relative float-right mr-4 mt-3"
                >
                + Add Expenses
                </button>
            </div>
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    
                </div>
            </div>
        </AppLayout>
    );
}
