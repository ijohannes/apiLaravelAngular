import { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurerntMovie] = useState(null);
    const [currentIndex, setCurerntIndex] = useState(-1);
    useEffect(() => {
        retrieveMovies();
    }, []);

    const retrieveMovies = () => {
        MovieService.getAll()
        .then(response => {
            setMovies(response.data);
            console.log(response.data);
        })
        .catch(err => {
            alert('Ocurrió un error');
            console.log(err);
        });
    }

    const refreshList = () => {
        retrieveMovies();
    }

    const setActiveMovie = (movie, index) => {
        setCurerntMovie(movie);
        setCurerntIndex(index);
    }
    return (
        <div className="row">
            <div className="col-6">
                <h4>Películas</h4>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Título</th>
                        <th scope="col">Año</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies &&
                            movies.map((movie, index) => (
                                <tr key={index}>
                                    <th>{movie.id}</th>
                                    <td>{movie.title}</td>
                                    <td>{movie.year}</td>
                                    <td><i className="bi bi-eye" onClick={() => setActiveMovie(movie, index)}></i> | </td>
                                    <td><Link className="bi bi-pencil-square" to={'/movies/' + movie.id}></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-6">
                {(currentMovie) ? (
                    <div>
                        <h4>{currentMovie.title}</h4>
                        <div>
                            <label>
                                <strong>Año: </strong>
                                {currentMovie.year}
                            </label>
                        </div>
                        <div>
                            <label>
                                <strong>Sinopsis: </strong>
                                {currentMovie.synopsis}
                            </label>
                        </div>
                        <div>
                            <img className="img-fluid" src={currentMovie.cover} />
                        </div>
                        <Link to={'/movie/' + currentMovie.id} className="badge badge-warning"> Editar </Link>
                    </div>
                ): (
                    <div>
                        <br />
                        <p>Primero selecciona una película...</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default MovieList