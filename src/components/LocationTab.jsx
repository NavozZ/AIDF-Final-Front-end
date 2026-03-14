function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.location);
  };

  const isActive = props.location._id === props.selectedLocation;

  return (
    <div
      className={`text-base font-medium rounded-full px-5 py-2 cursor-pointer whitespace-nowrap transition-all duration-300 border
        ${isActive
          ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.03]"
          : "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground"
        }`}
      onClick={handleClick}
    >
      {props.location.name}
    </div>
  );
}

export default LocationTab;