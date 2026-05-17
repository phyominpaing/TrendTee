import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar";
import { Badge } from "../ui/badge";

const useProductColumns = (): ColumnDef<Product>[] => {
  return [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const images = product.images;
        const visibleImages = images.slice(0, 2);
        const remainingImageCount = images.length - visibleImages.length;
        const productInitials = product.name.slice(0, 2).toUpperCase();

        return (
          <AvatarGroup>
            {visibleImages.length > 0 ? (
              visibleImages.map((image, index) => (
                <Avatar key={`${image.url}-${index}`}>
                  <AvatarImage
                    src={image.url}
                    alt={image.public_alt || product.name}
                  />
                  <AvatarFallback>{productInitials}</AvatarFallback>
                </Avatar>
              ))
            ) : (
              <Avatar>
                <AvatarFallback>{productInitials}</AvatarFallback>
              </Avatar>
            )}

            {remainingImageCount > 0 && (
              <AvatarGroupCount>+{remainingImageCount}</AvatarGroupCount>
            )}
          </AvatarGroup>
        );
      },

      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{product.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className=" uppercase">
              {product.category}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">$ {product.price.toFixed(2)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "instock_count",
      header: "Stock",
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant={
                stock > 10 ? "default" : stock > 0 ? "secondary" : "destructive"
              }
            >
              {stock}
            </Badge>
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium text-xs">
              {/* {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} */}
              {date.toLocaleDateString()}
            </span>
          </div>
        );
      },
    },
  ];
};

export default useProductColumns;
