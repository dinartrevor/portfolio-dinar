<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SkillService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    protected $skillService;

    public function __construct(SkillService $skillService)
    {
        $this->skillService = $skillService;
    }

    public function index()
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => \App\Http\Resources\SkillResource::collection($this->skillService->getAllSkills()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Skills/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|integer|min:0|max:100',
            'category' => 'nullable|string|max:255',
            'icon' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);

        $this->skillService->createSkill($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit($id)
    {
        $skill = \App\Models\Skill::findOrFail($id);
        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|integer|min:0|max:100',
            'category' => 'nullable|string|max:255',
            'icon' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);

        $this->skillService->updateSkill($id, $validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy($id)
    {
        $this->skillService->deleteSkill($id);

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted successfully.');
    }
}
