import { Component } from "react";
import { Form } from "react-bootstrap";
import MovieList from "./MovieList";
import SpinnerEle from "./SpinnerEle";
import CommentArea from "./CommentArea";

class Body extends Component {
  state = {
    movies: [],
    searchMovie: "",
    comment: [],
    movieTitle: ["Lord of the Rings"],
    selectedMovie: null,
  };

  // getMovie = async (movie, search) => {
  //   document.querySelector(".spinner-border").classList.remove("d-none");
  //   try {
  //     let response = await fetch(process.env.REACT_APP_BE_URL + "/media/");
  //     if (response.ok) {
  //       let data = await response.json();
  //       console.log(data);
  //       search
  //         ? this.setState({ movies: [data.Search] })
  //         : this.setState({ movies: [...this.state.movies, data.Search] });
  //       document.querySelector(".spinner-border").classList.add("d-none");
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // searchMovie = (e) => {
  //   if (e.target.value.length > 3) {
  //     this.getMovie(e.target.value, true);
  //   } else if (e.target.value.length === 0) {
  //     this.setState({ movies: [] });
  //     this.state.movieTitle.forEach(async (element) => {
  //       await this.getMovie(element, false);
  //     });
  //   }
  // };

  // componentDidMount = async () => {
  //   this.state.movieTitle.forEach(async (element) => {
  //     await this.getMovie(element, false);
  //   });
  // };

  componentDidMount = async () => {
    document.querySelector(".spinner-border").classList.remove("d-none");
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + "/media/");
      if (response.ok) {
        let data = await response.json();
        this.setState({ movies: [data] });

        document.querySelector(".spinner-border").classList.add("d-none");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <>
        <Form>
          <Form.Group>
            <Form.Label>Search book</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the movie that you want to search"
              onChange={(e) => this.searchMovie(e)}
            />
          </Form.Group>
        </Form>
        <SpinnerEle />
        <div style={{ marginTop: "20px" }}>
          {this.state.movies.length > 0 &&
            this.state.movies.map((movie, i) => {
              return (
                <MovieList
                  key={this.state.movies.imbdID}
                  movies={movie}
                  movieTitle={this.state.movieTitle[i]}
                  selectedMovie={this.state.selectedMovie}
                  newSelectedMovie={(imbdID) =>
                    this.setState({
                      selectedMovie: imbdID,
                    })
                  }
                />
              );
            })}
        </div>
        <CommentArea elementId={this.state.selectedMovie} />
        {console.log(this.state.selectedMovie)}
      </>
    );
  }
}

export default Body;
