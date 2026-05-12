<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $projects = $this->projectService->getAllProjects($search);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => [
                'data' => ProjectResource::collection($projects),
                'links' => $projects->linkCollection()->toArray(),
                'meta' => [
                    'pagination' => [
                        'total' => $projects->total(),
                        'per_page' => $projects->perPage(),
                        'current_page' => $projects->currentPage(),
                        'last_page' => $projects->lastPage(),
                        'from' => $projects->firstItem(),
                        'to' => $projects->lastItem(),
                    ],
                ],
            ],
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'thumbnail' => 'nullable|image|max:2048',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'category' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $this->projectService->createProject($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        return Inertia::render('Admin/Projects/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'thumbnail' => 'nullable|image|max:2048',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'category' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $this->projectService->updateProject($project->id, $validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $this->projectService->deleteProject($project->id);

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
