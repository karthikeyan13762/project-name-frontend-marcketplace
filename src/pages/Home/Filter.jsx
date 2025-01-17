import React from "react";

const category = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const age = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "12-20 years old",
    value: "12-20",
  },
];

function Filter({ showFilters, setShowFilters, filters, setFilters }) {
  // Function to handle checkbox changes
  const handleCheckboxChange = (e, filterType) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[filterType]) {
        updatedFilters[filterType] = [];
      }

      if (checked) {
        updatedFilters[filterType].push(value);
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      }

      return updatedFilters;
    });
  };

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Filters</h5>
        <i
          className="fa-solid fa-x text-danger cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
          title="Close Filters"
        ></i>
      </div>

      {/* Category Filter (Checkboxes) */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <div>
          {category.map((category) => (
            <div key={category.value} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`category-${category.value}`}
                value={category.value}
                checked={filters.category.includes(category.value)}
                onChange={(e) => handleCheckboxChange(e, "category")}
              />
              <label
                className="form-check-label"
                htmlFor={`category-${category.value}`}
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Age Range Filter (Checkboxes) */}
      <div className="mb-3">
        <label className="form-label">Age Range</label>
        <div>
          {age.map((age) => (
            <div key={age.value} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`age-${age.value}`}
                value={age.value}
                checked={filters.age.includes(age.value)}
                onChange={(e) => handleCheckboxChange(e, "age")}
              />
              <label className="form-check-label" htmlFor={`age-${age.value}`}>
                {age.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
