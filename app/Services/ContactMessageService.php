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
        return $this->messageRepository->create($data);
    }

    public function deleteMessage($id)
    {
        return $this->messageRepository->delete($id);
    }
}
