import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData, preetyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  //state = how to write a variable in react
  //countries Api = disease.sh/v3/covid-19/countries
  //useeffect powerful hook in react that runs piece of code based on given condition
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //code inside runs once when component loads and not again
    //async -> send request to server, wait n do sth with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //map -> loop though the array and return object in a shape
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
      // https://disease.sh/v3/covid-19/all
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All of the data from country response
        setCountryInfo(data);
        setMapCenter({
          lat: data.countryInfo.lat,
          lng: data.countryInfo.long,
        });
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      {/* Header */}
      {/* Title and Dropdown */}
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              {/* <MenuItem value="Worldwide">Worldwide</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={preetyPrintStat(countryInfo.todayCases)}
            total={preetyPrintStat(countryInfo.tests)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={preetyPrintStat(countryInfo.todayRecovered)}
            total={preetyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={preetyPrintStat(countryInfo.todayDeaths)}
            total={preetyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesTypes={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
        {/* Map */}
      </div>

      <Card className="app__right">
        <CardContent>
          <h3> Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3> Worldwide New Cases</h3>
        </CardContent>
        {/* Table */}
        {/* Graph */}
        <LineGraph casesType={"cases"} />
      </Card>
    </div>
  );
}

export default App;
