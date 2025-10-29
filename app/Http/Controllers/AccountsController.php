<?php

namespace App\Http\Controllers;

use App\Models\Accounts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsController extends Controller
{
    /**
     * Display all accounts.
     */
    public function index()
    {
        $accounts = Accounts::latest()->get();

        return Inertia::render('accounts/index', [
            'accounts' => $accounts,
        ]);
    }

    /**
     * Show the form to create a new account.
     */
    public function create()
    {
        return Inertia::render('accounts/create');
    }

    /**
     * Store a new account.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255', // e.g. cash, credit, loan
        ]);

        Accounts::create($validated);

        return redirect()->route('accounts.index')
            ->with('success', 'Account created successfully!');
    }

    /**
     * Show edit form for an existing account.
     */
    public function edit(Accounts $account)
    {
        return Inertia::render('accounts/edit', [
            'account' => $account,
        ]);
    }

    /**
     * Update an existing account.
     */
    public function update(Request $request, Accounts $account)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $account->update($validated);

        return redirect()->route('accounts.index')
            ->with('success', 'Account updated successfully!');
    }

    /**
     * Delete an account.
     */
    public function destroy(Accounts $account)
    {
        $account->delete();

        return redirect()->route('accounts.index')
            ->with('success', 'Account deleted successfully!');
    }
}
