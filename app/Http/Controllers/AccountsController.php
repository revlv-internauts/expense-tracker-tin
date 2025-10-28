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

        // Render Inertia React page
        return Inertia::render('accounts/index', [
            'accounts' => $accounts
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
        'type' => 'required|string|max:255', //cash,credit,loan
        // 'amount' is optional
    ]);

    $account = Accounts::create([
        'name' => $validated['name'],
        'type' => $validated['type'],
        'amount' => $validated['amount'] ?? 0, // default to 0
    ]);

    return redirect()->route('accounts.index')->with('success', 'Account created successfully!');
    }

    /**
     * Show a single account.
     */
    public function show(Accounts $account)
    {
        return Inertia::render('Accounts/Show', [
            'account' => $account
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(Accounts $account)
    {
        return Inertia::render('accounts/edit', [
            'account' => $account
        ]);
    }

    /**
     * Update an existing account.
     */
    public function update(Request $request, \App\Models\Accounts $account)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $account->update($validated);

        return redirect('/accounts')
            ->with('success', 'Expense updated successfully!');
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
