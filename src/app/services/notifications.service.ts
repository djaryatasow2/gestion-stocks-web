import { Injectable, signal } from '@angular/core';
import { WebSocketService } from './websocket.service';

export interface Notification {
  id: number;
  message: string;
  type: 'alerte' | 'info' | 'succes';
  lu: boolean;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<Notification[]>([]);
  nombreNonLus = signal<number>(0);

  constructor(private wsService: WebSocketService) {
    this.wsService.connect('192.168.101.185');
    this.wsService.getMessages().subscribe(data => {
      const notif: Notification = {
        id: Date.now(),
        message: data.message || data,
        type: data.type || 'info',
        lu: false,
        date: new Date().toLocaleTimeString()
      };
      this.notifications.update(n => [notif, ...n]);
      this.nombreNonLus.update(n => n + 1);
    });
  }

  marquerToutLu(): void {
    this.notifications.update(n => n.map((notif: Notification) => ({ ...notif, lu: true })));
    this.nombreNonLus.set(0);
  }
}