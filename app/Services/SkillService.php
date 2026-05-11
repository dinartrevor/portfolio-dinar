<?php

namespace App\Services;

use App\Repositories\SkillRepository;

class SkillService
{
    protected $skillRepository;

    public function __construct(SkillRepository $skillRepository)
    {
        $this->skillRepository = $skillRepository;
    }

    public function getAllSkills()
    {
        return $this->skillRepository->getAll();
    }

    public function createSkill(array $data)
    {
        return $this->skillRepository->create($data);
    }

    public function updateSkill($id, array $data)
    {
        return $this->skillRepository->update($id, $data);
    }

    public function deleteSkill($id)
    {
        return $this->skillRepository->delete($id);
    }
}
