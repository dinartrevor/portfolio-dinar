<?php

namespace App\Repositories;

use App\Models\Project;

class ProjectRepository
{
    public function getAll($search = null)
    {
        $query = Project::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('order')->orderBy('created_at', 'desc')->paginate(10);
    }

    public function getFeatured()
    {
        return Project::where('is_featured', true)->orderBy('order')->get();
    }

    public function find($id)
    {
        return Project::findOrFail($id);
    }

    public function create(array $data)
    {
        return Project::create($data);
    }

    public function update($id, array $data)
    {
        $project = Project::findOrFail($id);
        $project->update($data);
        return $project;
    }

    public function delete($id)
    {
        return Project::destroy($id);
    }
}
