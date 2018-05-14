import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  photoRows:object[] = [];
  currentPage:number = 1;
  maxPage:number = 1;

  constructor(private http: HttpClient) {
    this.fetchPhotos();
  }

  ngOnInit() {
  }


  fetchPhotos() {
    this.http.get(this.getApiUrl(this.currentPage)).subscribe(data => {
      this.photoRows = [];
      let photos = data['photos']['photo'];
      this.maxPage = data['photos']['pages'];
      let currentRow = [];
      for (let i in photos) {
        let photo = photos[i];
        let photoUrl = this.imageUrlBuilder(photo['farm'], photo['server'], photo['id'], photo['secret']);
        if (currentRow.length < 2 && +i !== photos.length - 1) {
          currentRow.push({url: photoUrl, name: photo['title']});
        } else {
          currentRow.push({url: photoUrl, name: photo['title']});
          this.photoRows.push(currentRow);
          currentRow = [];
        }
      }
    });
  }


  getApiUrl(page) {
    return "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos" +
      "&api_key=580e51fb0ef83cdbf92411eb93ecf005" +
      "&user_id=141118288%40N08" +
      "&per_page=20" +
      "&page="+ page +
      "&format=json" +
      "&nojsoncallback=1"
  }



  imageUrlBuilder(farmId, serverId, id, secret) {
    return "https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
  }


  nextPage() {
    this.currentPage++;
    this.fetchPhotos();
  }


  prevPage() {
    this.currentPage--;
    this.fetchPhotos();
  }

}
