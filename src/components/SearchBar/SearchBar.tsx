import "./SearchBar.scss";
import Icon from '../Icon';
import { Input } from "../Input/Input";
import { useState } from "react";
import Button from "../Button/Button";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="c-search">
      <Input type="search" name="main-search" placeholder='Digite o que está procurando' value={search} callback={setSearch} />
      <Button label="Pesquisar"><Icon size={30} icon="search" /></Button>
    </div >

  )
}

export default SearchBar