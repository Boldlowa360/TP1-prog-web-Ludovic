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
  chansons: string[] = [];
  albumAffiche: string ="";
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
  async infoAlbum(nom:string): Promise<void>{
    this.chansons=[];
    let y = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist="+this.artist+"&album="+nom+"&format=json"))
    console.log(y);
    for(let c of y.album.tracks.track){
      this.chansons.push(c.name)
    }
    this.albumAffiche = nom;
    }

  newSearch():void{
    this.artistAlbum = [];
    this.result = false;
  }
}
