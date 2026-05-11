<?php

namespace App\Services;

use App\Repositories\SettingRepository;

class SettingService
{
    protected $settingRepository;

    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    public function getAllSettings()
    {
        return $this->settingRepository->getAll();
    }

    public function getSetting($key)
    {
        return $this->settingRepository->getValue($key);
    }

    public function updateSetting($id, array $data)
    {
        return $this->settingRepository->update($id, $data);
    }
}
