import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";



@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {}


  public fetchPhotosOnPage(page: number): Observable<any> {
    return this.http.get(this.getApiUrl(page));
  }


  public getApiUrl(page: number) {
    return "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos" +
      `&api_key=${environment.apiKey}` +
      "&user_id=141118288%40N08" +
      "&per_page=12" +
      "&page="+ page +
      "&format=json" +
      "&nojsoncallback=1"
  }


  public imageUrlBuilder(farmId, serverId, id, secret): string {
    return "https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
  }


  public postLinkBuilder(id: number): string {
    return "https://www.flickr.com/photos/141118288%40N08/"+id+"/";
  }
}
