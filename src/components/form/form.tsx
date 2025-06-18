'use client';
import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { Box, TextField, MenuItem, Grid } from '@mui/material';

export default function AddressForm() {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates: any = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchedCities: any = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(fetchedCities);
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Nazione"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <MenuItem key={country.isoCode} value={country.isoCode}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Provincia / Stato"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!states.length}
          >
            {states.map((state: any) => (
              <MenuItem key={state.isoCode} value={state.isoCode}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Città"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!cities.length}
          >
            {cities.map((city : any) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="CAP"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
