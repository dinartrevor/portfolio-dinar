<?php

namespace App\Services;

use App\Repositories\ExperienceRepository;

class ExperienceService
{
    protected $experienceRepository;

    public function __construct(ExperienceRepository $experienceRepository)
    {
        $this->experienceRepository = $experienceRepository;
    }

    public function getAllExperiences()
    {
        return $this->experienceRepository->getAll();
    }

    public function createExperience(array $data)
    {
        return $this->experienceRepository->create($data);
    }

    public function updateExperience($id, array $data)
    {
        return $this->experienceRepository->update($id, $data);
    }

    public function deleteExperience($id)
    {
        return $this->experienceRepository->delete($id);
    }
}
