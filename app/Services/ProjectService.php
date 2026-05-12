<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Storage;

class ProjectService
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function getAllProjects($search = null)
    {
        return $this->projectRepository->getAll($search);
    }

    public function createProject(array $data)
    {
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof \Illuminate\Http\UploadedFile) {
            $data['thumbnail'] = $data['thumbnail']->store('projects', 'public');
        }

        return $this->projectRepository->create($data);
    }

    public function updateProject($id, array $data)
    {
        $project = $this->projectRepository->find($id);

        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof \Illuminate\Http\UploadedFile) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $data['thumbnail'] = $data['thumbnail']->store('projects', 'public');
        }

        return $this->projectRepository->update($id, $data);
    }

    public function deleteProject($id)
    {
        $project = $this->projectRepository->find($id);
        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }
        return $this->projectRepository->delete($id);
    }
}
