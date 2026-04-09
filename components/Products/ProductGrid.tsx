"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import ProductDetails from "./ProductDetails";
import { useAppContext } from "@/Contexts/AppContext";

const ProductGrid = ({ products }: { products: any }) => {
  const { searchQuery } = useAppContext();

  const params = useParams();
  const category = params.category as string;

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // Helper function to convert category path to match URL format
  const toSlug = (path: string) =>
    path.toLowerCase().replaceAll(" & ", "&").replaceAll(" ", "");

  const handleClickOpen = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // }

  const filteredProducts =
    category == "all"
      ? products
          .filter((product: any) => product.available !== false) // Only show available products
          .filter(
            (product: any) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          )
      : products
          .filter((item: any) => item.available !== false) // Only show available products
          .filter(
            (item: any) =>
              item.categoryId?.path &&
              toSlug(item.categoryId.path) === category.toLowerCase(),
          )
          .filter(
            (product: any) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-0">
      {filteredProducts.map((product: any, index: number) => (
        <div
          key={index}
          className="block"
          onClick={() => handleClickOpen(product)}
        >
          <div className="group rounded-lg overflow-hidden shadow-xl transition duration-500 sm:hover:scale-105">
            {/* Image Container */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-84">
              <img
                src={
                  product.url?.startsWith("data:")
                    ? product.url
                    : `https://maalem-backend-ybme.onrender.com${product.url}` ||
                      "/placeholder.png"
                }
                alt={product.name}
                className="h-full w-full object-cover transition duration-500 sm:group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Text */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base">$ {product.price}</p>
              </div>

              {/* Button */}

              <button
                className="
                  absolute bottom-3 right-3 
                  bg-[#c27a2c] text-white 
                  px-3 py-2 text-sm rounded-lg
                  sm:opacity-0 sm:group-hover:opacity-100
                  transition
                "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            background: "transparent", // remove white background
            boxShadow: "none",
            width: { xs: "90%", sm: "80%", md: "70%" }, // responsive width
            maxWidth: "900px",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.1)",
            backdropFilter: "blur(5px)",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions sx={{ position: "absolute", top: 8, right: 8 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#c27a2c", minWidth: "auto" }}
          >
            ✕
          </Button>
        </DialogActions>
        <ProductDetails
          key={open ? "active" : "inactive"}
          _id={selectedProduct?._id}
          name={selectedProduct?.name}
          originalPrice={selectedProduct?.originalPrice}
          url={selectedProduct?.url}
          description={selectedProduct?.description}
          price={selectedProduct?.price}
          bgColor="#2e4a63"
        />
      </Dialog>
    </div>
  );
};

export default ProductGrid;
