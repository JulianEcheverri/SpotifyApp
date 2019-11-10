import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // se instancia headers cuando necesita parametros, enviar token
import { map } from 'rxjs/operators'; // importamos el map operator, solo trabaja con operables
// le dice a angular que se podra inyectar en otros servicios, otros componentes, etc
// se podra instanciar en toda la app por ser declarado asi
@Injectable({
  // al tener este decorador, angular identifica que fue un servicio creado por nosotros
  // es opcional crear el provider en el app.module
  providedIn: 'root'
})
export class SpotifyService {
  // urlReleases = 'https://api.spotify.com/v1/browse/new-releases';

  constructor(private http: HttpClient) {
    // console.log('servicio listo');
  }

  // funcion para op´timizar el codigo y manegar una sola url
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQB9md1R0ZT_qGGVwzq0lUxyTKYbPTXmhKKZV90MCkMyvSNf5xFfdSaCrle7l56impQBm0EuzKqd2CSDfUE'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer BQANYhFEgqdPfhUa1voSR1_7VZxyiaJEG5jAjbfuAJNwm-1GQe_RtTtOZtNaPIgQcIIGqICqA6GwssSxDy8'
    // });
    // return this.http.get(this.urlReleases,{headers});
    // ahora usamos el pipe
    // pasamos la infor mediante un pipe, recordar que el pipe es un trasnformador de datos
    // no funciona tal cual pero realiza el mismo concepto a continuacion y el operador map para filtra la info requerida
    // return this.http.get(this.urlReleases, { headers }).pipe(map((data: any) => {
    //   return data.albums.items;
    // }));
    // this.http.get(this.url,{headers}).subscribe((response: any) => {
    //   console.log(response);
    // });

    // version simplificada usando la funcion query que recibe solo la direccion
    return this.getQuery('browse/new-releases?limit=20').pipe(map((data: any) => {
      return data.albums.items;
    }));
  }

  getArtists(termino: string) {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer BQANYhFEgqdPfhUa1voSR1_7VZxyiaJEG5jAjbfuAJNwm-1GQe_RtTtOZtNaPIgQcIIGqICqA6GwssSxDy8'
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers }).pipe(map((data: any) => {
    //   return data.artists.items;
    // }));

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map((data: any) => {
      return data.artists.items;
    }));
    // this.http.get(this.url,{headers}).subscribe((response: any) => {
    //   console.log(response);
    // });
  }

  getArtist(id: string){
    return this.getQuery(`artists/${id}`); // no se necesito pipe por que ya venia la informacion como queriamos
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map((data: any) => {
      return data.tracks;
    }));
  }
}
