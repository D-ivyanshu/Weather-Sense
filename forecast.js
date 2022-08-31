const key = 'ENj9SJxP0mAAS6hIiNXxfkG62Ipk3PWn'

// get weather object
const getWeather = async(id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();
    return data[0];
};


// get city id
const getCity = async(city) =>{
	const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	const query = `?apikey=${key}&q=${city}`;
	
	const response = await fetch(base+query);
    const data = await response.json();
	return data[0]; 
};


 
