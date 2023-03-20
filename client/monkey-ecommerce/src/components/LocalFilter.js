const LocalFilter = ({
    search,
    setSearch
}) => {

    const onSearch = (e) => {
        console.log(e);
        e.preventDefault();
        setSearch(e.target.value.toLowerCase());
    };

    return (
        <input
            type="search"
            placeholder="Filter"
            value={search}
            onChange={onSearch}
            className="form-control mb-3 mt-5"
        />
    );
};

export default LocalFilter;