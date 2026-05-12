<x-mail::message>
# New Contact Message Received

You have received a new message from your portfolio website.

**From:** {{ $contactMessage->name }} ({{ $contactMessage->email }})  
**Subject:** {{ $contactMessage->subject }}

**Message:**  
{{ $contactMessage->message }}

<x-mail::button :url="config('app.url') . '/admin/messages'">
View Messages
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
