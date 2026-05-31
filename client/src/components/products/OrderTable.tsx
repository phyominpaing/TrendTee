import { useGetAllOrdersQuery } from "@/store/slices/orderApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const OrderTable = () => {
  const { data } = useGetAllOrdersQuery(undefined);
  return (
    <div className="flex-2">
      <Card className="py-4">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            {" "}
            Here are your most recently added orders
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <table className="text-sm w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-2">Customer Email</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody className=" divide-y">
              {data?.map((order) => (
                <tr key={order._id} className="hover:bg-muted/50 ">
                  <td className="p-2 text-center">{order.customer}</td>
                  <td className="p-2 text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">${order.bill.toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${order.status === "delivered" ? "bg-green-100 text-green-800" : order.status === "paid" ? "bg-blue-100 text-blue-800" : order.status === "shipped" ? "bg-purple-100 text-purple-800" : order.status === "pending" ? "bg-yellow-100 text-yellow-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTable;
