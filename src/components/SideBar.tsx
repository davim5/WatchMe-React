import { useEffect,useState} from 'react'
import { api } from '../services/api';

import { Button } from '../components/Button';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  sideHandleClickButton(genreId:Number): void;
  sideSelectedGenreId: Number;
}

export function SideBar({sideHandleClickButton,sideSelectedGenreId}:SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    sideHandleClickButton(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={sideSelectedGenreId === genre.id}
          />
          ))}
      </div>

    </nav>
    );
}