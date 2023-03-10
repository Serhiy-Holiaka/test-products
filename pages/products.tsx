import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Products.module.css";
import { useDebounce } from '@/hooks/useDebounce';

const inter = Inter({ subsets: ["latin"] });

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch("api/products");
        const data = await res.json();
        setProducts(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, []);

  useMemo(() => {
    setNewProducts(products.filter((item: any) => {
            if (debouncedValue.trim().length > 2) {
                return item.description.toLowerCase().includes(debouncedValue.trim().toLowerCase()) || item.name.toLowerCase().includes(debouncedValue.trim().toLowerCase());
            }
            return item;
        })
    );
}, [debouncedValue, setNewProducts, products]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <h2 className={inter.className}>PRODUCTS</h2>
        </div>
        <div className={styles.inputWrap}>
          <input type="text" value={value} onChange={onChange} />
        </div>
        <div>
          {newProducts.length > 0 ? (
            <ul className={styles.productsWrap}>
              {newProducts.map(({ id, name, description, price }, i) => (
                  <li key={id}>
                    <div className={styles.card}>
                      <h4>{name}</h4>
                      <p>{description}</p>
                      <span>Price: {price}</span>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p>Nothing found.</p>
          )}
        </div>
      </main>
    </>
  );
}
