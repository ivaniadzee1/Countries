import { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const Country = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      country.region.toLowerCase().includes(regionFilter.toLowerCase())
  );



  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleCloseDetail = () => {
    setSelectedCountry(null);
  };

  return (
    <div className='bg-[#FAFAFA;]'>
      <header className='flex justify-between w-full h-[80px] bg-[#FFF;]'>
        <h1 className='text-2xl font-sans font-extrabold pt-[23px] pl-[80px] text-black'>
          Where in the world?
        </h1>
      </header>
      <input
        className='w-[440px] h-[56px] bg-[#FFF;] mt-[48px] ml-[20px]'
        type="text"
        placeholder='Search for a country…'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={() => setRegionFilter('Africa')} className='absolute right-[123px] top-[120px]  cursor-pointer'>
        Filter by Region
      </button>

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 pl-[80px] pr-[80px] pt-[200px] md:grid-cols-4">
        {filteredCountries.map((country, index) => (
          <div key={index} className="bg-[#FFF] p-4 cursor-pointer" onClick={() => handleCountryClick(country)}>
            <img src={country.flag} alt={country.name} className="w-full h-auto" />
            <p className="text-lg font-semibold"> {country.name}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className='fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <button onClick={handleCloseDetail} className='absolute top-4 right-4 text-gray-600 hover:text-gray-800'>
              Close
            </button>
            <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-full h-auto" />
            <h2 className='text-2xl font-semibold'>{selectedCountry.name}</h2>
            <p>Population: {selectedCountry.population}</p>
            <p>Region: {selectedCountry.region}</p>
            <p>Capital: {selectedCountry.capital}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
