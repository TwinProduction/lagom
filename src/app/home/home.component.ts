import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const FLICKR_REQUEST_URL = "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=35386aee3ec9c8398c501b2552e789d9&user_id=141118288%40N08&per_page=20&format=json&nojsoncallback=1";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  photos = [];


  constructor(private http: HttpClient) {
    this.http.get(FLICKR_REQUEST_URL).subscribe(data => {
      var photos = data['photos']['photo'];
      for (let i in photos) {
        let photo = photos[i];
        let photoUrl = this.imageUrlBuilder(photo['farm'], photo['server'], photo['id'], photo['secret']);
        //console.log(photoUrl);
        this.photos.push(photoUrl);
      }
    });
  }


  ngOnInit() {
  }



  imageUrlBuilder(farmId, serverId, id, secret) {
    return "https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
  }


  renderPhotos() {
    console.log("rendering photos");
    return this.photos;
  }

}
