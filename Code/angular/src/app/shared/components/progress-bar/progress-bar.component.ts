import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit{
  @Input('value') value;
  
  ngOnInit(): void {
    // this.value = 0;
    // setInterval(() => {
    //   if(this.value !== 100 ) this.value += 1
    // }, 100)
    // setTimeout(() => {
    //   this.value = 60
    // }, 1000)
  }
}
