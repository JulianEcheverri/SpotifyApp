import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe(params => {
      // console.log(params.id);
      this.getArtist(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit() {
  }

  getArtist(id: string) {
    this.loading = true;
    return this.spotifyService.getArtist(id).subscribe((data: any) => {
      this.artist = data;
      console.log(data);
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    // this.loading = true;
    return this.spotifyService.getTopTracks(id).subscribe((data: any) => {
      this.topTracks = data;
      console.log(data);
      // this.loading = false;
    });
  }
}
