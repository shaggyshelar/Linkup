import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {
    public static LEAVE_APPROVED='Leave approved';
    public static REQUEST_FAILED='Request not completed';
    public static LEAVE_REJECTED='Leave Rejected';

    onMessageAdd: EventEmitter<Object> = new EventEmitter<Object>();

    getMessages() {
        return this.onMessageAdd;
    }

    addMessage(value: Object) {
        this.onMessageAdd.emit(value);
    }
}
