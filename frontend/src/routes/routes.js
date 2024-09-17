import { ListCountries } from "../pages/ListCountries/ListCountries"
import { CountryInfo } from "../pages/CountryInfo/CountryInfo";

const routes = [
    {
        path: "/",
        component: ListCountries,
        exact: true
    },
    {
        path: "/country/:code",
        component: CountryInfo,
        exact: true
    }
]

export default routes;