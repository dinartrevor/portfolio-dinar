<?php

namespace App\Services;

use App\Repositories\ContactMessageRepository;

class ContactMessageService
{
    protected $messageRepository;

    public function __construct(ContactMessageRepository $messageRepository)
    {
        $this->messageRepository = $messageRepository;
    }

    public function getAllMessages()
    {
        return $this->messageRepository->getAll();
    }

    public function getMessage($id)
    {
        return $this->messageRepository->markAsRead($id);
    }

    public function createMessage(array $data)
    {
        $message = $this->messageRepository->create($data);

        // Send email notification
        $contactEmail = \App\Models\Setting::where('key', 'contact_email')->first()?->value;
        if ($contactEmail) {
            \Illuminate\Support\Facades\Mail::to($contactEmail)->send(new \App\Mail\ContactMessageReceived($message));
        }

        return $message;
    }

    public function deleteMessage($id)
    {
        return $this->messageRepository->delete($id);
    }
}
