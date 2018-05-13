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


  constructor(private http: HttpClient) {
    this.http.get(this.getApiUrl(1)).subscribe(data => {
      console.log(data);
      let photos = data['photos']['photo'];
      let currentRow = [];
      for (let i in photos) {
        let photo = photos[i];
        console.log("photo ", i, photo);
        let photoUrl = this.imageUrlBuilder(photo['farm'], photo['server'], photo['id'], photo['secret']);
        if (currentRow.length < 2 && +i !== photos.length - 1) {
          currentRow.push({url: photoUrl, name: photo['title']});
        } else {
          currentRow.push({url: photoUrl, name: photo['title']});
          console.log("pushing row with " + currentRow.length + " elements");
          this.photoRows.push(currentRow);
          currentRow = [];
        }
        //this.photos.push({url: photoUrl, name: photo['title']});
      }
    });
  }

  ngOnInit() {
  }


  getApiUrl(page) {
    return "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos" +
      "&api_key=580e51fb0ef83cdbf92411eb93ecf005" +
      "&user_id=141118288%40N08" +
      "&per_page=6" +
      "&page="+ page +
      "&format=json" +
      "&nojsoncallback=1"
  }



  imageUrlBuilder(farmId, serverId, id, secret) {
    return "https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
  }

}
