<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\SettingService;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => \App\Http\Resources\SettingResource::collection($this->settingService->getAllSettings()),
        ]);
    }

    public function edit($id)
    {
        $setting = \App\Models\Setting::findOrFail($id);
        return Inertia::render('Admin/Settings/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $this->settingService->updateSetting($id, $validated);

        return redirect()->route('admin.settings.index')->with('success', 'Setting updated successfully.');
    }
}
