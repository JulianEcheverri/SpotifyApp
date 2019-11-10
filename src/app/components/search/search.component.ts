import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artistas: any[] = [];
  constructor(private httpSearch: SpotifyService) {

   }

  ngOnInit() {
  }

  buscar(termino: string, event?: any){
    // event.preventDefault();
    // console.log(termino);
    this.httpSearch.getArtist(termino).subscribe((data: any) => {
      console.log(data);
      this.artistas = data;
    });
  }
}
