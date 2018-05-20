import {Component, OnInit} from '@angular/core';
import {ImageService} from "../service/image.service";
import {Photo} from "../model/photo.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  photoRows: object[] = [];
  currentPage: number = 1;
  maxPage: number = 1;
  galleryClass: string = "";


  constructor(private imageService: ImageService) {
    this.getPhotos();
  }


  ngOnInit() {}


  getPhotos() {
    this.imageService.fetchPhotosOnPage(this.currentPage).subscribe(data => {
      let photos: Photo[] = data['photos']['photo'];
      this.maxPage = data['photos']['pages'];
      this.photoRows = [];
      let currentRow = [];
      for (let i in photos) {
        let photo = photos[i];
        let imageUrl = this.imageService.imageUrlBuilder(photo.farm, photo.server, photo.id, photo.secret);
        let postUrl = this.imageService.postLinkBuilder(photo.id);
        if (currentRow.length < 2 && +i !== photos.length - 1) {
          currentRow.push({imageUrl: imageUrl, name: photo.title, postUrl: postUrl, id: photo.id});
        } else {
          currentRow.push({imageUrl: imageUrl, name: photo.title, postUrl: postUrl, id: photo.id});
          this.photoRows.push(currentRow);
          currentRow = [];
        }
      }
      this.galleryClass = "";
    });
  }


  mouseEnter(event) {
    event.target.style.boxShadow = "0 0 20px #333";
    event.target.style.transform = "scale(1.01)";
  }


  mouseLeave(event) {
    event.target.style.boxShadow = "initial";
    event.target.style.transform = "";
  }


  nextPage() {
    this.currentPage++;
    this.galleryClass = "fade";
    this.getPhotos();
  }


  prevPage() {
    this.currentPage--;
    this.galleryClass = "fade";
    this.getPhotos();
  }

}
