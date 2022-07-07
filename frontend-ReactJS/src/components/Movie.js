import { useEffect, useState } from 'react';
import MovieService from '../services/MovieService';

const Movie = (props) => {
    const initialMovieState = {
        id: null,
        title: '',
        cover: '',
        synopsis: '',
        year: null
    };
    const [currentMovie, setCurrentMovie] = useState(initialMovieState);
    const [message, setMessage] = useState('');

    const getMovie = id => {
        MovieService.getById(id)
        .then(response => {
            setCurrentMovie(response.data)
        })
        .catch(err => {
            alert('Ocurrió un error');
            console.log(err);
        });
    }

    useEffect(() => {
        getMovie(props.match.params.id)
    },[props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentMovie({ ...currentMovie, [name]: value });
    }

    const updateMovie = () => {    
        MovieService.update(currentMovie.id, currentMovie)
            .then(response => {
                setMessage('La película fue actualizada correctamente');
            })
            .catch(err => {
                setMessage('Ocurrió un error actualizando la película');
                console.log(err);
            });
    }

    const deleteMovie = () => {
        const userConfirmed = window.confirm('Desea eliminar la película?');
        if(!userConfirmed){
            return;
        }
        MovieService.remove(currentMovie.id)
        .then(response=> {
            props.history.push('/movies');
        })
        .catch(err => {
            setMessage('Ocurrió un error al eliminar la película');
            console.log(err);
        });
    }

    return (
        <div className="submit-form">
            {!currentMovie ? (
                <div>
                    <h4>Por favor selecciona una película</h4>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label>Título</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title" 
                            required 
                            defaultValue={currentMovie.title} 
                            onChange={handleInputChange}
                            name="title" />
                    </div>
                    <div className="form-group">
                        <label>Portada</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="cover" 
                            required 
                            defaultValue={currentMovie.cover} 
                            onChange={handleInputChange}
                            name="cover" />
                    </div>
                    <div className="form-group">
                        <label>Sinopsis</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="synopsis" 
                            required 
                            defaultValue={currentMovie.synopsis} 
                            onChange={handleInputChange}
                            name="synopsis" />
                    </div>
                    <div className="form-group">
                        <label>Año</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="year" 
                            required 
                            defaultValue={currentMovie.year} 
                            onChange={handleInputChange}
                            name="year" />
                    </div>
                    <br />
                    <button onClick={updateMovie} className="btn btn-success">Actualizar Película</button> | 
                    <button onClick={deleteMovie} className="btn btn-danger">Eliminar Película</button>
                    <div>
                    </div>
                        <p>{message}</p>
                </div>
            )}

        </div>
    )
};

export default Movie