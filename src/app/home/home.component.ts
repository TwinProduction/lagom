import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  galleryClass:string = "";


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
        let imageUrl = this.imageUrlBuilder(photo['farm'], photo['server'], photo['id'], photo['secret']);
        let postUrl = this.postLinkBuilder(photo['id'])
        if (currentRow.length < 2 && +i !== photos.length - 1) {
          currentRow.push({imageUrl: imageUrl, name: photo['title'], postUrl: postUrl});
        } else {
          currentRow.push({imageUrl: imageUrl, name: photo['title'], postUrl: postUrl});
          this.photoRows.push(currentRow);
          currentRow = [];
        }
      }
      this.galleryClass = "";
    });
  }


  getApiUrl(page) {
    return "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos" +
      "&api_key=580e51fb0ef83cdbf92411eb93ecf005" +
      "&user_id=141118288%40N08" +
      "&per_page=12" +
      "&page="+ page +
      "&format=json" +
      "&nojsoncallback=1"
  }


  imageUrlBuilder(farmId, serverId, id, secret) {
    return "https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
  }


  postLinkBuilder(id) {
    return "https://www.flickr.com/photos/141118288%40N08/"+id+"/";
  }


  nextPage() {
    this.currentPage++;
    this.galleryClass = "fade";
    this.fetchPhotos();
  }


  prevPage() {
    this.currentPage--;
    this.galleryClass = "fade";
    this.fetchPhotos();
  }

}
