import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "../components/products/ProductList";

const Home = () => {
  const { data: newArrivals = [] } = useGetNewArrivalsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedQuery(undefined);

  return (
    <main className="mt-16">
      <section>
        <h1 className="text-xl font-semibold uppercase mb-6 text-center">
          New Arrivals
        </h1>
        <ProductList products={newArrivals} />
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
