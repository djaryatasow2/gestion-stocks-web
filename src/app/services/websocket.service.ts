import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<any>();
  private connected = false;

  connect(ip: string): void {
    if (this.connected) return;
    if (this.socket?.readyState === WebSocket.OPEN) return;
    if (this.socket?.readyState === WebSocket.CONNECTING) return;

    const url = `ws://${ip}:8080/ws/notifications`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.connected = true;
      console.log('WebSocket connecté');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageSubject.next(data);
      } catch {
        this.messageSubject.next(event.data);
      }
    };

    this.socket.onclose = () => {
      this.connected = false;
      if (localStorage.getItem('token')) {
        setTimeout(() => this.connect(ip), 30000);
      }
    };

    this.socket.onerror = () => {
      this.connected = false;
      this.socket?.close();
    };
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.connected = false;
    this.socket?.close();
    this.socket = null;
  }
}