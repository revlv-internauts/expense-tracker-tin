import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AccountCreate() {
  // Initialize the form
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    type: '',
  });

  // Submit handler
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/accounts', {
      onSuccess: () => {
        // Navigate to accounts index without full page reload
        window.location.href = '/accounts';
      },
      onError: () => {
        // Inertia automatically populates `errors`
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Add Account" />
      <div className="p-5 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-6">Add Account</h1>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Account Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="input w-full"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Type (Cash, Credit Card, Loan)"
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="input w-full"
            />
            {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
            >
              Save
            </button>

            <Link
              href="/accounts"
              className="rounded-md bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-400"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
