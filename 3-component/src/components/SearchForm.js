import React from "react";

const SearchForm = ({ value, onChange, onSubmit, onReset }) => {
  // 중첩  함수로 변경
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const handleReset = () => {
    onReset();
  };

  const handleChangeInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        autoFocus
        value={value}
        onChange={handleChangeInput}
      />
      {value.length > 0 && <button type="reset" className="btn-reset"></button>}
    </form>
  );
};

export default SearchForm;
