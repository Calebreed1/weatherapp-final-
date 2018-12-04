import React, { Component } from "react";
import API from "../../utils/DarkSkyAPI";
import GeoCodeAPI from "../../utils/GeoCodeAPI";
import Navbar from "../../components/Navbar";
// import WeatherAlert from "../../components/WeatherAlert";
// import Time from "../../components/Time";
import WeatherIcons from "../../components/WeatherIcons";
import CurrentWeather from "../../components/CurrentWeather";
import HourlyForecast from "../../components/HourlyForecast";
import Map from "../../components/Map";
import FiveDayForecast from "../../components/FiveDayForecast";
import Footer from "../../components/Footer";


class WeatherApp extends Component {
    state = {
        geoCode: [],
        address: "dallas,tx",
        latitude: 32.7767,
        longitude: -96.7970,
        image: "",
        backgroundImage: "",
        alert: "",
        time: "",
        timeZone: "America/Chicago",
        currently: "",
        currentTemp: "",
        feelsLike: "",
        dailyLow: "",
        dailyHigh: "",
        dewPoint: "",
        precipChance: "",
        currentWeather: [],
        dailyWeather: [],
        hourlyWeather: [],
        currentTime: "",
        city: "",
        // state: ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }; //closes handleInputChange

    handleFormSubmit = event => {
        event.preventDefault();
        GeoCodeAPI.search(
            this.state.address,
            console.log(`address = ${this.state.address}`)
        )
            .then(res => {
                this.setState({
                    geoCode: res.data,
                    latitude: res.data.results[0].geometry.location.lat,
                    longitude: res.data.results[0].geometry.location.lng,
                    city: res.data.results[0].address_components[0].long_name,
                    // state: res.data.results[0].address_components[2].long_name,
                })
                console.log(this.state.geoCode);
                console.log(this.state.city);
                console.log(this.state.state);
                API.search(
                    this.state.latitude,
                    this.state.longitude,
                    console.log(`
                    latitude = ${this.state.latitude}
                    longitude = ${this.state.longitude}
                    `)
                )
                    .then(res => {
                        this.setState({
                            currentWeather: res.data,
                            // alert: res.data.alerts[0],
                            timeZone: res.data.timezone,
                            image: res.data.currently.icon,
                            backgroundImage: res.data.currently.icon,
                            currentSummary: res.data.currently.summary,
                            currentTemp: res.data.currently.temperature,
                            feelsLike: res.data.currently.apparentTemperature,
                            dailyWeather: res.data.daily.data,
                            hourlyWeather: res.data.hourly.data,
                            dailyLow: res.data.daily.data[0].temperatureLow,
                            dailyHigh: res.data.daily.data[0].temperatureHigh,
                            dewPoint: res.data.currently.dewPoint,
                            precipChance: res.data.currently.precipProbability,
                            currentTime: res.data.currently.time
                        })
                        console.log(this.state.currentWeather);
                        // console.log(this.state.hourlyWeather);
                        console.log(`
                        Time Zone: ${this.state.timeZone}
                        Current Time: ${this.state.currentTime}
                        Alert: ${this.state.alert}
                        Current Temp: ${this.state.currentTemp} 
                        Feels Like: ${this.state.feelsLike}
                        Time: ${this.state.currentWeather.currently.time}
                        Summary: ${this.state.currentWeather.currently.summary}
                        Daily Low: ${this.state.dailyLow}
                        Daily High: ${this.state.dailyHigh}
                        Dew Point: ${this.state.dewPoint}
                        Precip Chance: ${this.state.precipChance}
                        Image: ${this.state.image}
                        background-image: ${this.state.backgroundImage}
                        `)
                    })
            })
            .catch(error => console.log(error))
            .then(res => {
                // this.value();
                document.getElementById('search').value = ''
            })
    };  //closes handleFormSubmit

    componentWillMount() {
        GeoCodeAPI.search(
            this.state.address,
            console.log(`
            address = ${this.state.address}
            `)
        )
            .then(res => {
                this.setState({
                    geoCode: res.data,
                    latitude: res.data.results[0].geometry.location.lat,
                    longitude: res.data.results[0].geometry.location.lng,
                    city: res.data.results[0].address_components[0].long_name,
                    // state: res.data.results[0].address_components[2].long_name,
                })
                console.log(`address = ${this.state.address}`);
                console.log(this.state.geoCode);
                console.log(this.state.city);
                console.log(this.state.state);
                API.search(
                    this.state.latitude,
                    this.state.longitude,
                    console.log(`
                    latitude = ${this.state.latitude}
                    longitude = ${this.state.longitude}
                    `)
                )
                    .then(res => {
                        this.setState({
                            currentWeather: res.data,
                            // alert: res.data.alerts[0],
                            timeZone: res.data.timezone,
                            currentTime: res.data.currently.time,
                            image: res.data.currently.icon,
                            backgroundImage: res.data.currently.icon,
                            currentSummary: res.data.currently.summary,
                            currentTemp: res.data.currently.temperature,
                            feelsLike: res.data.currently.apparentTemperature,
                            dailyWeather: res.data.daily.data,
                            hourlyWeather: res.data.hourly.data,
                            dailyLow: res.data.daily.data[0].temperatureLow,
                            dailyHigh: res.data.daily.data[0].temperatureHigh,
                            dewPoint: res.data.currently.dewPoint,
                            precipChance: res.data.currently.precipProbability,
                        })
                        console.log(this.state.currentWeather);
                        console.log(`
                        Time Zone: ${this.state.timeZone}
                        Current Time: ${this.state.currentTime}
                        Alert: ${this.state.alert}
                        Current Temp: ${this.state.currentTemp} 
                        Feels Like: ${this.state.feelsLike}
                        Time: ${this.state.currentWeather.currently.time}
                        Summary: ${this.state.currentWeather.currently.summary}
                        Daily Low: ${this.state.dailyLow}
                        Daily High: ${this.state.dailyHigh}
                        Dew Point: ${this.state.dewPoint}
                        Precip Chance: ${this.state.precipChance}
                        Image: ${this.state.image}
                        background-image: ${this.state.backgroundImage}
                        `)
                    })
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <div id={this.state.backgroundImage} >
                    <Navbar
                        value={this.state.search}
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />

                    {/* <WeatherAlert /> */}

                    <CurrentWeather
                        currentTime={this.state.currentTime}
                        timeZone={this.state.timeZone}
                        city={this.state.city}
                        image={this.state.image}
                        currentSummary={this.state.currentSummary}
                        currentTemp={this.state.currentTemp}
                        feelsLike={this.state.feelsLike}
                        dailyLow={this.state.dailyLow}
                        dailyHigh={this.state.dailyHigh}
                    >
                        <WeatherIcons />
                    </CurrentWeather>

                    <div id="scrollContainer">
                        {(this.state.hourlyWeather.slice(1, 19)).map((hourly, i) => (
                            <HourlyForecast
                                timeZone={this.state.timeZone}
                                hourlyIcon={hourly.icon}
                                hourlyTime={hourly.time}
                                hourlyTemp={hourly.temperature}
                                hourlyPrecip={hourly.precipProbability}
                                key={i}

                            />
                        ))}
                    </div>

                    <div id="scrollContainer">
                        {(this.state.dailyWeather.slice(1, 6)).map((daily, i) => (
                            <FiveDayForecast
                                date={daily.time}
                                dailyIcon={daily.icon}
                                dailySummary={daily.summary}
                                dailyTempHigh={daily.temperatureMax}
                                dailyTempLow={daily.temperatureMin}
                                dailyPrecip={daily.precipProbability}
                                key={i}
                            />
                        ))}
                    </div>
                </div>

                <Map
                    lat={this.state.latitude}
                    lng={this.state.longitude}
                    zoom={8}
                    mapField="temp" />

                <Footer />
            </div>
        )
    }
}
export default WeatherApp;