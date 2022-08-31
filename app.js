const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const UpdateUI = (data) => {
    
	// old way 
	// const cityDetails = data.cityDetails;
	// const weather = data.weather;

	// destructure properties (new way)

	const {cityDetails, weather} = data;
    
	details.innerHTML = `
	    <h5 class="my-3">${cityDetails.EnglishName}</h5>
	    <div class="my-3">${weather.WeatherText}</div>
	    <div class="display-4 my-4">
	      <span>${weather.Temperature.Metric.Value}</span>
	      <span>&deg;C</span>
	    </div>
	`;
    
	// changing image according to the time 
	let timeSrc = null;
	if(weather.IsDayTime){
       timeSrc = 'img/day.svg';
	}
	else{
		timeSrc = 'img/night.svg';
	}
    
	time.setAttribute('src',timeSrc);
	
    // updating the icons
    
	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src',iconSrc);


 	//if the class card have d - none then remove it 
	if(card.classList.contains("d-none")){
		card.classList.remove("d-none");
	}
     
	console.log(weather);

};


// we are able to use this function bcz forecast js is called 
// in index.html before app.js



const updateCity = async (city) => { 
	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return{
		cityDetails: cityDetails,
		weather: weather
	};
};

cityForm.addEventListener('submit', e => {
    
	// it will prevent the defualt actions like refreshing the page
	e.preventDefault();

	//get city value
    const city = cityForm.city.value.trim();
	cityForm.reset();
	
	//update tha ui with the city details
	updateCity(city)
	.then(data => UpdateUI(data))
	.catch(err => console.log(err));
});