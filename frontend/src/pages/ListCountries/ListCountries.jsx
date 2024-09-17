import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ListCountries = () => {

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3000/countries/')
            .then(response => response.json())
            .then(data => setCountries(data.data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main className='container pt-2'>
            <h1>List of Countries</h1>
            <section>
                {
                    isLoading ?
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        : countries.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Code</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        countries.map((country, index) => (
                                            <tr key={index}>
                                                <td>{country.countryCode}</td>
                                                <td>{country.name}</td>
                                                <td>
                                                    <Link to={`/country/${country.countryCode}`} className='btn btn-primary'>View</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                }
                {
                    countries.length === 0 && !isLoading && <p>No countries found</p>
                }

            </section>
        </main>
    )
}
