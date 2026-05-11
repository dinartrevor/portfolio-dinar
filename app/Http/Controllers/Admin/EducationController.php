<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Educations/Index', [
            'educations' => Education::orderBy('start_year', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Educations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'nullable|string|max:255',
            'major' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
        ]);

        Education::create($validated);

        return redirect()->route('admin.educations.index')->with('success', 'Education added successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('Admin/Educations/Edit', [
            'education' => $education,
        ]);
    }

    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'nullable|string|max:255',
            'major' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
        ]);

        $education->update($validated);

        return redirect()->route('admin.educations.index')->with('success', 'Education updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect()->route('admin.educations.index')->with('success', 'Education deleted successfully.');
    }
}
