<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ContactMessageService;
use App\Http\Resources\ContactMessageResource;
use Inertia\Inertia;

class MessageController extends Controller
{
    protected $messageService;

    public function __construct(ContactMessageService $messageService)
    {
        $this->messageService = $messageService;
    }

    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessageResource::collection($this->messageService->getAllMessages()),
        ]);
    }

    public function show($id)
    {
        $message = $this->messageService->getMessage($id);
        return Inertia::render('Admin/Messages/Show', [
            'message' => $message,
        ]);
    }

    public function destroy($id)
    {
        $this->messageService->deleteMessage($id);

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
