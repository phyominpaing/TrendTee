import ProductList from "../components/products/ProductList"

const Home = () => {
  return (
   <main className="mt-16">
      <section>
        <h1 className="text-xl font-semibold uppercase mb-6 text-center">New Arrivals</h1>
        <ProductList/>
      </section>

       <section className="mt-16">
        <h1 className="text-xl font-semibold uppercase mb-6 text-center">Best Deals</h1>
        <ProductList/>
      </section>
   </main>
  )
}

export default Home