import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/Card";

function App() {
  const [values, setValues] = useState();
  const [listBooks, setListBooks] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListBooks(response.data);
    });
  }, [listBooks]);

  return (
    <div className="app--container">
      <div className="register--container">
        <h1>Biblioteca</h1>
        <input
          onChange={handleChangeValues}
          type="text"
          name="name"
          placeholder="Nome"
          className="register--input"
        />
        <input
          type="text"
          onChange={handleChangeValues}
          name="cost"
          placeholder="Preço"
          className="register--input"
        />
        <input
          type="text"
          onChange={handleChangeValues}
          name="category"
          placeholder="Categoria"
          className="register--input"
        />
        <button onClick={handleClickButton} className="register--button">
          Cadastrar
        </button>
      </div>
      <div className="list--allGames">
        {typeof listBooks != "undefined" &&
          listBooks.map((value) => {
            return (
              <Card
                key={value.idlivro}
                listCard={listBooks}
                setListBooks={setListBooks}
                id={value.idlivro}
                name={value.name}
                cost={value.cost}
                category={value.category}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default App;
