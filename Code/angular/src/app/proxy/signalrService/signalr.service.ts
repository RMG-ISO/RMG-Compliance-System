import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  private isNotificationHubConnected = false

  constructor() { }

  public initiateSignalrConnection(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apis.default.url}/signalr-hubs/notification-hub`) // the SignalR server url
        .build();

        this.configureConnection(this.connection);
      // this.connection
      //   .start()
      //   .then(() => {
      //     resolve(true);
      //   })
      //   .catch((error) => {
      //     reject();
      //   });

    });
  }

  configureConnection(connection): void {
    // debugger
    ////Reconnect loop
    function start() {
      return new Promise(function (resolve, reject) {
        connection.start()
          .then(resolve)
          .catch(() => {
            setTimeout(() => {
              start().then(resolve);
            }, 5000);
          });
      });
    }
    // Reconnect if hub disconnects

    connection.onclose(e => {
      this.isNotificationHubConnected = false;
      start().then(() => {
        this.isNotificationHubConnected = true;
      });
    });

    start().then(() => {
      this.isNotificationHubConnected = true;
    });
    // Register to get notifications
  }
}
