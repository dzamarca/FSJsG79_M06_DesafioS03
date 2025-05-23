import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get(urlBaseServer + "/posts");
    setPosts([...data.posts]);
  };

  const limpiaVariables = ()=>{
    //DZ: Se agrega esto paera que limpiara el formulario al agregar un dato
    setTitulo('');
    setImgSRC('');
    setDescripcion('');
  }

  const agregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion };

    if(imgSrc.length >100){
      setImgSRC('');
      return alert('URL tiene más de 100 caracteres, favor buscar otra URL');
    }

    if(titulo.length == 0){
      return alert('Titulo no puede estar vacio, favor registrar un nombre');
    }

    if(imgSrc.length == 0){
      return alert('URL no puede estar vacia, favor registrar una URL con menos de 100 caractreres');
    }

    if(descripcion.length == 0){
      return alert('Descripción no puede estar vacia, favor registrar un descripcion');
    }

    await axios.post(urlBaseServer + "/posts", post);
    limpiaVariables();
    getPosts();

  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            //DZ: Se agrega titulo, imgSrc y descripcion para que limpiara el formulario al agregar un dato
            titulo={titulo}
            imgSrc={imgSrc}
            descripcion={descripcion}
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
