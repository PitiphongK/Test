"use client"
import { useState } from "react";
import "./ProductList.css";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: "อาหาร" | "เครื่องดื่ม" | "ของใช้" | "เสื้อผ้า";
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "ข้าวผัด",
    sku: "FOOD-001",
    price: 45,
    stock: 20,
    category: "อาหาร",
    createdAt: "2026-09-25",
  },
  {
    id: 2,
    name: "น้ำส้ม",
    sku: "DRINK-001",
    price: 25,
    stock: 50,
    category: "เครื่องดื่ม",
    createdAt: "2026-09-25",
  },
  {
    id: 3,
    name: "สบู่",
    sku: "ITEM-001",
    price: 35,
    stock: 0,
    category: "ของใช้",
    createdAt: "2026-09-25",
  },
  {
    id: 4,
    name: "เสื้อยืด",
    sku: "CLOTH-001",
    price: 299,
    stock: 5,
    category: "เสื้อผ้า",
    createdAt: "2026-09-25",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const filteredProducts = getFilteredProducts();

  let totalValue = 0;

  for (const product of filteredProducts) {
    totalValue += product.price * product.stock;
  }

  function getFilteredProducts() {
    if (selectedCategory == "ทั้งหมด") {
      return products
    }
    return products.filter((product) => { 
      return product.category === selectedCategory;
    })
  }

  function sellProduct(productId: number) {
    const productToSell = products.find((product) => {
      return product.id === productId;
    });

    if (!productToSell) {
      alert("ไม่พบสินค้า");
      return;
    }

    if (productToSell.stock === 0) {
      alert("ขายไม่สำเร็จ: สินค้าหมด");
      return;
    }

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          stock: product.stock - 1,
        };
      }

      return product;
    });

    setProducts(updatedProducts);
    alert(`ขาย ${productToSell.name} สำเร็จ`);
  }

  
  return (
  <div>
      <h1>รายการสินค้า</h1>
      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option value="ทั้งหมด">ทั้งหมด</option>
        <option value="อาหาร">อาหาร</option>
        <option value="เครื่องดื่ม">เครื่องดื่ม</option>
        <option value="ของใช้">ของใช้</option>
        <option value="เสื้อผ้า">เสื้อผ้า</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>หมวดหมู่</th>
            <th>ราคา (บาท)</th>
            <th>สต็อก</th>
            <th>การจัดการ</th>
          </tr>
        </thead>

        <tbody>
          {getFilteredProducts().map((product) => {
            const isOutOfStock = product.stock === 0;
            const isLowStock = product.stock < 10 && product.stock != 0;

            return (
              <tr
                key={product.id}
                className={`${isOutOfStock ? "out-of-stock" : ""} ${isLowStock ? "low-stock" : ""}`}
              >
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price.toFixed(2)}</td>

                <td>
                  {product.stock}
                </td>

                <td>
                  <button type="button">แก้ไข</button>
                  <button type="button">ลบ</button>
                  <button
                    type="button"
                    onClick={() => sellProduct(product.id)}
                    disabled={product.stock === 0}
                  >
                    ขาย
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>จำนวนสินค้าทั้งหมด: {filteredProducts.length} รายการ</p>
        <p>มูลค่ารวม: {totalValue.toFixed(2)} บาท</p>
      </div>
    </div>

  )
}

export default ProductList
