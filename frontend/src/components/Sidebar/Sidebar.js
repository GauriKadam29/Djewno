



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Sidebar.module.css";

const Sidebar = ({ onFilterChange }) => {

  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.subcategories.subcategories);
  const brands = useSelector((state) => state.brands.brands);
  const gemstones = useSelector((state) => state.staticValues.gemstones);
  const materials = useSelector((state) => state.staticValues.materials);




  const [filters, setFilters] = useState({
    minPrice: 40,
    maxPrice: 910,
    categories: [],
    subcategories: [],
    gemstones: [],
    materials: [],
    brands: [],
    productStatus: [],
  });






  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCheckboxChange = (event, filterType) => {
    const { value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: Number(value) }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.filterSection}>
        <h3>Widget Price Filter</h3>
        <div className={classes.priceInputs}>
          <div>
            <p>Min Price</p>
            <input
              type="text"
              name="minPrice"
              value={filters.minPrice}
              onChange={handlePriceChange}
            />
          </div>
          <div>
            <p>Max Price</p>
            <input
              type="text"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className={classes.priceFilter}>
          <p>Price: ${filters.minPrice} — ${filters.maxPrice}</p>
          <button onClick={() => onFilterChange(filters)}>FILTER</button>
        </div>
      </div>

      <div className={classes.filterSection}>
        <h3>Product Categories</h3>
        {categories.map((category) => (
          <div key={category.id}>
            <div className={classes.categoryRow}>
              <label>
                <input
                  type="checkbox"
                  value={category.name}
                  onChange={(e) => handleCheckboxChange(e, "categories")}
                />
                {category.name}
              </label>
             
              <span
                onClick={() => toggleCategory(category.name)}
                className={classes.toggleIcon}
              >
                {expandedCategories[category.name] ? "−" : "+"}
              </span>

            </div>
            {expandedCategories[category.name] && (
              <div className={classes.subcategories}>
                {subcategories
                  .filter((sub) => sub.category_id === category.id)
                  .map((sub) => (
                    <label key={sub.id}>
                      <input
                        type="checkbox"
                        value={sub.id}
                        onChange={(e) => handleCheckboxChange(e, "subcategories")}
                      />
                      {sub.name}
                    </label>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* GEMSTONE FILTER */}
      <div className={classes.filterSection}>
        <h3>Filter by Gemstones</h3>
        <div className={classes.gemstoneFilters}>
          {gemstones.map((gem) => (
            <label key={gem}>
              <input
                type="checkbox"
                value={gem}
                onChange={(e) => handleCheckboxChange(e, "gemstones")}
              />
              {gem}
            </label>
          ))}
        </div>
      </div>

      {/* MATERIAL FILTER */}
      <div className={classes.filterSection}>
        <h3>Filter by Material</h3>
        <div className={classes.gemstoneFilters}>
          {materials.map((material) => (
            <label key={material}>
              <input
                type="checkbox"
                value={material}
                onChange={(e) => handleCheckboxChange(e, "materials")}
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className={classes.filterSection}>
        <h3>Filter by Brands</h3>
        <div className={classes.gemstoneFilters}>
          {brands.map((brand) => (
            <label key={brand.id}>
              <input
                type="checkbox"
                value={brand.id}
                onChange={(e) => handleCheckboxChange(e, "brands")}
              />
              {brand.name}
            </label>
          ))}
        </div>
      </div>

      {/* PRODUCT STATUS FILTER */}
      <div className={classes.filterSection}>
        <h3>Product Status</h3>
        <div className={classes.gemstoneFilters}>
          {["In Stock", "On Sale"].map((status) => (
            <label key={status}>
              <input
                type="checkbox"
                value={status.toLowerCase().replace(" ", "_")}
                onChange={(e) => handleCheckboxChange(e, "productStatus")}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



