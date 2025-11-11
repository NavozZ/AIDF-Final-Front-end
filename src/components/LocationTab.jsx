function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.location);
  };

  // Active location tab style: Primary Blue background, strong shadow
  // Assuming 'bg-primary' and 'shadow-blue-500/30' are defined or available.
  const activeTabStyles =
    "bg-primary text-white border-primary-light shadow-xl shadow-blue-500/30 transform scale-[1.03] backdrop-blur-sm";

  // Default inactive tab style: Dark background, subtle border, pronounced hover effect
  const inactiveTabStyles =
    "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg backdrop-blur-md";

  // Base styles are kept clean and focus on accessibility (cursor, transition)
  const baseStyles = 
    "text-base font-medium rounded-full px-5 py-2 cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out";
  
  return (
    <div
      className={`${baseStyles} 
        ${props.location._id === props.selectedLocation ? activeTabStyles : inactiveTabStyles}`}
      onClick={handleClick}
    >
      {props.location.name}
    </div>
  );
}

export default LocationTab;