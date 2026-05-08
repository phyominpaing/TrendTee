import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "../components/products/ProductList";
import { Link } from "react-router";

const Home = () => {
  const { data: newArrivals = [] } = useGetNewArrivalsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedQuery(undefined);

  return (
    <main>
      <section>
        <h1 className="text-xl font-semibold uppercase mb-6 text-center">
          New Arrivals
        </h1>
        <ProductList products={newArrivals} />
        <div className="flex justify-center mt-6">
          <Link
            to="/products/filter"
            className="text-center border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 "
          >
            View All
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h1 className="text-xl font-semibold uppercase mb-6 text-center">
          Best Deals
        </h1>
        <ProductList products={featured} />
      </section>
    </main>
  );
};

export default Home;
