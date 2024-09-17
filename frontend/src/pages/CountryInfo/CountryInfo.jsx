import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const CountryInfo = () => {

    const [country, setCountry] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { code } = useParams();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/countries/${code}`)
            .then(response => response.json())
            .then(data => {
                if (data.meta.status !== 500)
                    setCountry(data.data);
                else
                    setError(true);
            }).catch(() => {
                console.log('Error fetching data');
            })
            .finally(() => setIsLoading(false));
    }, [code]);

    const normalizePopulation = (population) => {
        const maxValue = Math.max(...population.map(p => p.value));
        return population.map(p => ({
            ...p,
            normalizedValue: p.value / maxValue
        }));
    };

    const normalizedPopulation = country.population ? normalizePopulation(country.population) : [];

    return (
        <main className='container pt-2'>
            <Link to='/'>Back to List</Link>
            {
                (isLoading) ? (
                    <div className="spinner-border d-block mt-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : error ? (
                    <p>There was an error</p>
                ) : (
                    <>
                        <section className="d-flex align-items-center gap-2">
                            <h1>{country.commonName}</h1>
                            <img src={country.flag} alt={country.commonName} width={50} />
                        </section>
                        <p>{country.officialName} | {country.region}</p>
                        <section className="mt-3">
                            <div className="country__infoChart">
                                <h2 className="h5">Population</h2>
                                <table className="charts-css column show-labels">
                                    <caption> Column Example #6 </caption>
                                    <thead>
                                        <tr>
                                            <th scope="col"> Year </th>
                                            <th scope="col"> Progress </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            normalizedPopulation?.map((population, index) => (
                                                <tr key={index}>
                                                    <th scope="row" style={{ fontSize: '8px' }}> {population.year} </th>
                                                    <td style={{ '--size': population.normalizedValue }}></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section className="mt-5">
                            <h2 className="h5">Border Countries</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        country.borders?.map((border, index) => (
                                            <tr key={index}>
                                                <td>{border.countryCode}</td>
                                                <td>{border.commonName}</td>
                                                <td>
                                                    <Link to={`/country/${border.countryCode}`} className='btn btn-primary'>View</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                    </>
                )
            }
        </main>
    )
}
