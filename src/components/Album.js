import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';



class Album extends Component {
  constructor(props) {
     super(props);
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration,
       isPlaying: false,
       volSet: 0,
       volChange: 0

      };
     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }

   componentDidMount() {
     this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

   componentVolumeDidMount() {
     this.eventListeners = {
        volumeset: e => {
          this.setState({ volSet: this.audioElement.volSet });
        },
        volumechange: e => {
          this.setState({ volChange: this.audioElement.volChange });
        }
      };
      this.audioElement.addEventListener('volumeset', this.eventListeners.volumeset);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentVolumeWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.src = null;
     this.audioElement.removeEventListener('volumeset', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.durationchange);
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

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
     this.play(newSong);
    }

    handleNextClick(){
         const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
         const newIndex = Math.min(currentIndex +1, this.state.album.songs.length -1);
         const newSong = this.state.album.songs[newIndex];
         this.setSong (newSong);
         this.play(newSong);

     }

    handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

   handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volSet: newVolume });
  }

    formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      //var minutes divides seconds in song by 60 to get minutes (rounded down using math.floor)
      var leftoverSeconds = Math.floor(seconds % 60);
      //var leftoverSeconds takes seconds modulus by 60 to get the remainder of seconds (rounded down using math.floor)
      if ( leftoverSeconds < 10) {
        leftoverSeconds = "0" + leftoverSeconds
         }
      //if states that if leftoverSeconds is less than 9 than it will add a "0" to the front of the number

      return(minutes + ':' + leftoverSeconds);
      //return states add var minutes and var leftoversecond together with a : to format time like mm:ss
 }

   render() {
     return (
       <section className="album">
       <section id="album-info">
       <img id="album-cover-art" alt ="Album Cover Art" src={this.state.album.albumCover} />
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
                 <td className="song-duration">{this.formatTime(song.duration)}</td>
               </tr>
             )}
           </tbody>
         </table>
         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           volSet={this.audioElement.volSet}
           volChange={this.audioElement.volChange}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(e) => this.formatTime(e)}
         />
       </section>
     );
   }
 }
export default Album
