import { Component } from '@angular/core';
import { ImgService } from 'src/services/img.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'img';
  constructor(private imgSer: ImgService) { }

  onFileUpload(event) {
    this.imgSer.onFileUpload(event, -1);
    
  } 
  test() {
    this.imgSer.getData();
  }
}
