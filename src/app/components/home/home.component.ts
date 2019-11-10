import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  // // consumiendo api
  // url = 'https://restcountries.eu/rest/v2/lang/es';
  // paises: any[] = [];
  // // necesitamos una variable para hacer la peticion a la API (peticiones http)
  // constructor(private http: HttpClient) {
  //   // la linea get dice a angular que en cualquier momento alguien se subscribe
  //   // subscribir es escuchar los cambios que el servicio regrese
  //   // para eso se usa el subscribe
  //   this.http.get(this.url).subscribe((response: any) => {
  //      this.paises = response;
  //     //  console.log(this.paises);
  //   });

  //  }
  // // consumiendo api

constructor(private spotify: SpotifyService) {
    // hacer una peticion para ocupar un token
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    // en esta pagina se encuentra la configuracion de una llamada tipo POST para generar mi token
    // https://developer.spotify.com/console/browse/ aqui encontramos la informacion disponible
    // se remondable centralizar todo el codigo haciendo un service
    // comando service ng g s services/spotify
    // llamamos una funcion creada que obtiene la data
    this.loading = true;
    this.spotify.getNewReleases().subscribe((response: any) => {
      this.nuevasCanciones = response;
      this.loading = false;
      console.log(response);
    });
   }
  ngOnInit() {
  }

}
