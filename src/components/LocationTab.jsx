function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.location);
  };

  // Active location tab style with modern effects
  const activeTabStyles =
    "bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-500 shadow-lg transform scale-105 backdrop-blur-sm";

  // Default inactive tab style
  const inactiveTabStyles =
    "bg-black/50 text-white border-gray-700 hover:bg-gray-800 hover:shadow-xl backdrop-blur-md";

  return (
    <div
      className={`text-base font-semibold border rounded-full px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out 
        ${props.location._id === props.selectedLocation ? activeTabStyles : inactiveTabStyles}`}
      onClick={handleClick}
    >
      {props.location.name}
    </div>
  );
}

export default LocationTab;
