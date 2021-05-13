import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImgService {
  Imgs: any;
  selecetdFile: File;
  img: string;
  constructor(private http: HttpClient) {
    this.getData();
  }
  //get randomize id
  getRandomId() {
    return Math.floor(Math.random() * 999999);
  }
  
  //file upload img
  onFileUpload(event, id,message) {
    this.selecetdFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
      
      if (id == -1) {
        this.newUpload(this.img, this.getRandomId(), event.target.files[0].name,message);
      } else {
        this.updateImg(this.img, id);
      }
    };
    reader.readAsDataURL(this.selecetdFile);
  }


  //create new img
  async newUpload(img, id, name,message) {
    let data = {
      id: id,
      img: img,
      name: name,
      message:message
    }
    await this.http.post(environment.endpoint + "uploadImg", data).toPromise();
    this.getData();
  }
  //get data
  async getData() {
    this.Imgs = await this.http.get(environment.endpoint + "imgs").toPromise();
  }
  
  //update img
  async updateImg(img, id) {
    let data = {
      id: id,
      img: img
    }
    await this.http.put(environment.endpoint + "update", data).toPromise();

    this.getData();
  }

  //delete img
  async delImg(id) {
    await this.http.delete(environment.endpoint + "delete?id=" + id).toPromise();
    this.getData();
  }


}
