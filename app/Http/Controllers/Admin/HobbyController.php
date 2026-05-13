<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hobby;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HobbyController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Hobbies/Index', [
            'hobbies' => Hobby::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Hobbies/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        Hobby::create($validated);

        return redirect()->route('admin.hobbies.index')->with('success', 'Hobby created successfully.');
    }

    public function edit(Hobby $hobby)
    {
        return Inertia::render('Admin/Hobbies/Edit', [
            'hobby' => $hobby,
        ]);
    }

    public function update(Request $request, Hobby $hobby)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $hobby->update($validated);

        return redirect()->route('admin.hobbies.index')->with('success', 'Hobby updated successfully.');
    }

    public function destroy(Hobby $hobby)
    {
        $hobby->delete();

        return redirect()->route('admin.hobbies.index')->with('success', 'Hobby deleted successfully.');
    }
}
