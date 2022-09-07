import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})

export class SignalrService {
  apiName = 'Default';
  public data:[];
  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:44375/api/Dashboard')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    public addTreatmentRisksListener = () => {
      this.hubConnection.on('TreatmentRisks', (data) => {
        debugger;
        this.data = data;
        console.log(data);
      });
    }
}
