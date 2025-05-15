import { BrowseFilm } from "./BrowseFilm";
import { BrowseTV } from "./BrowseTV";

export function Browse() {
  return (
    <div className="browsing" >  
      <div className="browseFilms">
        <BrowseFilm/>
      </div>
      <div className="browseShows">
        <BrowseTV/>
      </div>
    </div>
  );
}
