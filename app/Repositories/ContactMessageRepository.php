<?php

namespace App\Repositories;

use App\Models\ContactMessage;

class ContactMessageRepository extends BaseRepository
{
    public function __construct(ContactMessage $message)
    {
        parent::__construct($message);
    }

    public function getAll()
    {
        return $this->model->orderBy('created_at', 'desc')->get();
    }

    public function markAsRead($id)
    {
        $message = $this->find($id);
        $message->update(['is_read' => true]);
        return $message;
    }
}
