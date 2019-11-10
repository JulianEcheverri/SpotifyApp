import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artistas: any[] = [];
  loading: boolean;

  constructor(private httpSearch: SpotifyService) {
   }

  ngOnInit() {
  }

  buscar(termino: string, event?: any){
    this.loading = true;
    if (termino.length > 0) {
      this.httpSearch.getArtists(termino).subscribe((data: any) => {
        console.log(data);
        this.artistas = data;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    // event.preventDefault();
    // console.log(termino);
  }
}
