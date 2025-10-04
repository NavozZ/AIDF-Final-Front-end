function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.location);
  };

  // Active location tab style with dark glass effect
  const activeTabStyles = "bg-blue-500 text-white border-blue-500 shadow-lg backdrop-blur-sm transform scale-105";

  return (
    <div
      className={`text-base font-medium border rounded-full px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out 
        ${props.location._id === props.selectedLocation 
          ? activeTabStyles 
          : 'bg-black/50 text-white border-gray-700 hover:bg-gray-800 hover:shadow-lg backdrop-blur-md'}`}
      onClick={handleClick}
    >
      {props.location.name}
    </div>
  );
}

export default LocationTab;
