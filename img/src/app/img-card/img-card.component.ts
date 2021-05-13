import { Component, OnInit } from '@angular/core';
import { ImgService } from 'src/services/img.service';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.scss']
})
export class ImgCardComponent implements OnInit {
  imgs:any;
  constructor(public imgSer:ImgService) { }

  ngOnInit(): void {

    
  }

  //put file to sevices for checking
  onFileUpload(event,id) {
    // this.imgSer.onFileUpload(event,"update");
    this.imgSer.onFileUpload(event,id,"none");

  }
  //delete file
  del(id){
    this.imgSer.delImg(id);
  }
}
