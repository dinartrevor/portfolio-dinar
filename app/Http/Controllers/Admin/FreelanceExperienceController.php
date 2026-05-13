<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FreelanceExperience;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FreelanceExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/FreelanceExperiences/Index', [
            'experiences' => FreelanceExperience::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/FreelanceExperiences/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'project_name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'technologies' => 'nullable|array',
            'description' => 'nullable|string',
            'project_url' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'testimonial' => 'nullable|string',
            'status' => 'required|string|in:completed,on-going',
            'featured' => 'required|boolean',
            'order' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('freelance', 'public');
        }

        FreelanceExperience::create($validated);

        return redirect()->route('admin.freelance-experiences.index')->with('success', 'Freelance experience created successfully.');
    }

    public function edit(FreelanceExperience $freelanceExperience)
    {
        return Inertia::render('Admin/FreelanceExperiences/Edit', [
            'experience' => $freelanceExperience,
        ]);
    }

    public function update(Request $request, FreelanceExperience $freelanceExperience)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'project_name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'technologies' => 'nullable|array',
            'description' => 'nullable|string',
            'project_url' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'testimonial' => 'nullable|string',
            'status' => 'required|string|in:completed,on-going',
            'featured' => 'required|boolean',
            'order' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            if ($freelanceExperience->image) {
                Storage::disk('public')->delete($freelanceExperience->image);
            }
            $validated['image'] = $request->file('image')->store('freelance', 'public');
        }

        $freelanceExperience->update($validated);

        return redirect()->route('admin.freelance-experiences.index')->with('success', 'Freelance experience updated successfully.');
    }

    public function destroy(FreelanceExperience $freelanceExperience)
    {
        if ($freelanceExperience->image) {
            Storage::disk('public')->delete($freelanceExperience->image);
        }
        $freelanceExperience->delete();

        return redirect()->route('admin.freelance-experiences.index')->with('success', 'Freelance experience deleted successfully.');
    }
}
