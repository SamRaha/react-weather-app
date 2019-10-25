import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "647921a790b017d66fa1bea50a4ec79a";

//http://api.openweathermap.org/data/2.5/weather?q=Leeds,uk&APPID=647921a790b017d66fa1bea50a4ec79a&units=metric

//function to grab json weather files

class App extends React.Component {
  state = { //things that keep track of changes
    temperature: undefined,  //initial state of the object
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault(); /*prevents the default behaviour of the button... so it doesn't referesh and it returns the object.*/
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) { /*making a check that city and country are returned true*/
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined, //returning the others to undefined so they show nothing.
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values." 
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container"> {/*creating 5 columns*/}
                  <Titles />    
                </div>
                <div className="col-xs-7 form-container"> {/*creating 7 columns*/}
                  <Form getWeather={this.getWeather} /> {/* inputting the function within the render app. setting up a prop and calling it to the function within the App class.*/}
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;