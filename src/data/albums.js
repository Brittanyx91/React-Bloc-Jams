import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
     super(props);
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       isPlaying: false
     };
     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }
   play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }
   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }
   handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }     
       this.play();
     }
    }
   render() {
     return (
       <section className="album">
       <section id="album-info">
       <img id="album-cover-art" src={this.state.album.albumCover} />
            <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
           <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
           {this.state.album.songs.map( (song, index) =>
               <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                 <td className="song-actions">
                   <button>
                     <span className="song-number">{index+1}</span>
                     <span className="ion-play"></span>
                     <span className="ion-pause"></span>
                   </button>
                 </td>
                 <td className="song-title">{song.title}</td>
                 <td className="song-duration">{song.duration}</td>
               </tr>
             )}
           </tbody>
         </table>
       </section>
     );
   }
 }

export default [{
  title: 'The Colors',
  artist: 'Pablo Picasso',
  releaseInfo: '1909 Spanish Records',
  albumCover: '/assets/images/album_covers/01.jpg',
  slug: 'the-colors',
  songs: [
      { title: 'Blue', duration: '161.71', audioSrc: '/assets/music/blue.mp3' },
      { title: 'Green', duration: '103.96', audioSrc: '/assets/music/green.mp3' },
      { title: 'Red', duration: '268.45', audioSrc: '/assets/music/red.mp3' },
      { title: 'Pink', duration: '153.14', audioSrc: '/assets/music/pink.mp3' },
      { title: 'Magenta', duration: '374.22', audioSrc: '/assets/music/magenta.mp3' }
  ]
}, {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    releaseInfo: '1909 EM',
    albumCover: '/assets/images/album_covers/02.jpg',
    slug: 'the-telephone',
    songs: [
      { title: 'Blue', duration: '161.71', audioSrc: '/assets/music/blue.mp3' },
      { title: 'Green', duration: '103.96', audioSrc: '/assets/music/green.mp3' },
      { title: 'Red', duration: '268.45', audioSrc: '/assets/music/red.mp3' },
      { title: 'Pink', duration: '153.14', audioSrc: '/assets/music/pink.mp3' },
      { title: 'Magenta', duration: '374.22', audioSrc: '/assets/music/magenta.mp3' }
    ]
}];
