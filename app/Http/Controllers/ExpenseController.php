<?php

namespace App\Http\Controllers;
use App\Models\Accounts;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of expenses.
     */
    public function index()
    {
        $expenses = Expense::orderBy('created_at', 'desc')->get();

        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
        ]);
    }

    /**
     * Show the form for creating a new expense.
     */
    public function create()
    {
        return Inertia::render('expenses/create', [
            'accounts' => Accounts::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created expense in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'remarks' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'account_id' => 'required|exists:accounts,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        Expense::create($request->only('remarks', 'amount', 'account_id', 'category_id'));

        return redirect()->route('expenses.index')->with('success', 'Expense created successfully.');
    }


    /**
     * Show the form for editing the specified expense.
     */
    public function edit(Expense $expense)
    {
        return Inertia::render('expenses/edit', [
            'expense' => $expense,
        ]);
    }

    /**
     * Update the specified expense in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'remarks' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        $expense->update($request->only('remarks', 'amount'));

        return redirect()->route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    /**
     * Remove the specified expense from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Expense deleted successfully.');
    }
}
