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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDeleteProductMutation } from "@/store/slices/productApi";
import TableHeaderWithSortIcon from "./TableHeaderWithSortIcon";

const useProductColumns = (): ColumnDef<Product>[] => {
  const navigate = useNavigate();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const productDeleteHandler = async (id: string, name: string) => {
    try {
      await deleteProduct(id).unwrap();

      toast.success(`Product ${name} deleted successfully.`);
    } catch {
      toast.error("Failed to delete product. Please try again.");
    }
  };

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
      header: () => <div className="w-full text-center">Price</div>,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium">$ {product.price.toFixed(2)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "instock_count",
      header: ({ column }) => {
        return (
          <TableHeaderWithSortIcon
            text="Stock"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <div className="flex items-center justify-center gap-2">
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
      header: ({ column }) => {
        return (
          <TableHeaderWithSortIcon
            text="Created At"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {/* {date.toLocaleDateString()} */}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                  className="whitespace-nowrap"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <Eye className=" h-4 w-4" />
                  View details
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="whitespace-nowrap"
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                >
                  <Edit className=" h-4 w-4" />
                  Edit product
                </DropdownMenuItem>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="whitespace-nowrap">
                    <Trash className=" h-4 w-4" />
                    Delete Product
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete product?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{product.name}". This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() =>
                    productDeleteHandler(product._id, product.name)
                  }
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];
};

export default useProductColumns;
