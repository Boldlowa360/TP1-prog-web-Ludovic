import { Component } from '@angular/core';
import { album } from './album';
import{ HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Une variable devra être ajoutée ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  result : boolean = false;
  artist : string = "";
  artistAlbum: album[]= [];

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Le constructeur devra être ajouté ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  constructor(public http:HttpClient){

  }
  async searchArtist():Promise<void>{
    this.result = true;
	
    let x = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+this.artist+"&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    console.log(x);
    for(let a of x.topalbums.album){
      this.artistAlbum.push(new album(a.name,a.image[3]["#text"]));
  }
    // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
	  // La requête HTTP devra être ajoutée ici
    // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  }

  newSearch():void{
    this.artistAlbum = [];
    this.result = false;
  }
}
