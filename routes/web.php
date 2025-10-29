<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Models\Expense;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

//for accounts
Route::get('/accounts', [AccountsController::class, 'index'])->name('accounts.index');
Route::get('/accounts/create', [AccountsController::class, 'create'])->name('accounts.create');
Route::post('/accounts', [AccountsController::class, 'store'])->name('accounts.store');
Route::get('/accounts/{account}/edit', [AccountsController::class, 'edit'])->name('accounts.edit');
Route::put('/accounts/{account}', [AccountsController::class, 'update'])->name('accounts.update');
Route::delete('/accounts/{account}', [AccountsController::class, 'destroy'])->name('accounts.destroy');


//for expenses
Route::get('/expenses', [ExpenseController::class, 'index'])->name('expenses.index');
Route::get('/expenses/create', [ExpenseController::class, 'create'])->name('expenses.create');
Route::post('/expenses', [ExpenseController::class, 'store'])->name('expenses.store');
Route::get('/expenses/{expense}/edit', [ExpenseController::class, 'edit'])->name('expenses.edit');
Route::put('/expenses/{expense}', [ExpenseController::class, 'update'])->name('expenses.update');
Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy'])->name('expenses.destroy');

//authentication
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () { 
    $expenses = Expense::with(['account', 'category'])->latest()->get();
    return Inertia::render('dashboard', [
        'expenses' => $expenses,
    ]);
})->name('dashboard');

//for categories
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

require __DIR__.'/settings.php';
