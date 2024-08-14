import "./SearchBar.scss";
import Icon from '../Icon';
import { Input } from "../Input/Input";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../Button/Button";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form className="c-search" onSubmit={handleSubmit}>
      <Input type="search" name="main-search" placeholder='Digite o que está procurando' value={search} callback={setSearch} />
      <Button type="submit" label="Pesquisar">
        <Icon size={30} icon="search" />
      </Button>
    </form>
  )
}

export default SearchBar