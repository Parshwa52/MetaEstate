import React, { useEffect, useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import "./styles.css";

const PropertyMarketplace = () => {
  // Default Value
  var defaultSports = [
    {
      name: "Goregaon(W)",
      category: "100",
      imgsrc:
        "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
    },
    {
      name: "Dadar(E)",
      category: "200",
      imgsrc:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      name: "Matunga(W)",
      category: "300",
      imgsrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      name: "Khar(E)",
      category: "400",
      imgsrc:
        "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
    },
    {
      name: "Mahim(W)",
      category: "400",
      imgsrc:
        "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2022/1/27/4-cent-trivandrum-home-view.jpg",
    },
  ];
  const [sportList, setSportList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();

  // Add default value on page load
  useEffect(() => {
    setSportList(defaultSports);
    // eslint-disable-next-line
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return sportList;
    }
    return sportList.filter((item) => item.category === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div>
      <div className="filter-container">
        <div>Filter by Category:</div>
        <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </select>
        </div>
      </div>
      <div className="sport-list">
        {filteredList.map((element, index) => (
          <PropertyCard {...element} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PropertyMarketplace;
