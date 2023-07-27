import "./Search.css";
import search from "../../Icons/search.svg";

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ searchValue, setSearchValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <div className="Search">
      <input placeholder="Поиск" onChange={handleChange} value={searchValue} />
      <img className="Icon" alt="" src={search} />
    </div>
  );
};

export default Search;
