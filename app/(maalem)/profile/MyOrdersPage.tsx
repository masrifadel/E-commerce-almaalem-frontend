const MyOrdersPage = ({ orders }: { orders: any }) => {
  const calcTotal = (items: any[]) => {
    let total = 0;
    items.map((item) => {
      total += item.quantity * item.priceAtPurchase;
    });
    return total;
  };

  return (
    <div className="w-full sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
        My Orders
      </h2>

      {/* Desktop header */}
      <div className="hidden sm:grid grid-cols-7 gap-4 items-center bg-[#c27a2c] shadow-sm rounded p-3 text-sm font-semibold">
        <p className="text-center text-white">IMAGE</p>
        <p className="text-center text-white">CREATED</p>
        <p className="text-center text-white">ORDER ID</p>
        <p className="text-center text-white">SHIPPING</p>
        <p className="text-center text-white">ITEMS</p>
        <p className="text-center text-white">PRICE</p>
        <p className="text-center text-white">STATUS</p>
      </div>

      {orders.length > 0 ? (
        orders.map((order: any, index: number) => (
          <div
            key={order._id}
            className="bg-[#2e4a63] rounded shadow-sm mt-4 p-4 sm:p-2"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col gap-2 sm:hidden">
              <div className="flex items-center gap-3">
                <img
                  src={`https://maalem-backend-ybme.onrender.com${order.items[0].productId.url}`}
                  alt="Product"
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  {/* <p className="text-sm text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p> */}
                  <p className="font-semibold text-white">
                    #{order._id.slice(0, 4)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-white">
                📍 {order.shippingAddress.city}
              </p>

              <div className="flex justify-between text-sm">
                <span className="text-white">Items: {order.items.length}</span>
                <span className="font-semibold text-white">
                  {/* ${order.items.map(()=> )} */}
                  {calcTotal(order.items)}
                </span>
              </div>

              <span
                className={`text-center text-sm py-1 rounded ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:grid grid-cols-7 gap-4 items-center text-center">
              <img
                src={`https://maalem-backend-ybme.onrender.com${order.items[0].productId.url}`}
                alt="Product"
                className="w-12 h-12 object-cover rounded mx-auto"
              />

              <p className="text-white">
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>

              <p className="text-white">#{order._id.slice(0, 4)}</p>

              <p className="text-white">{order.shippingAddress.city}</p>

              <p className="text-white">{order.items.length}</p>

              <p className="font-semibold text-white">
                $ {calcTotal(order.items)}
              </p>

              <span
                className={`py-1 rounded ${
                  order.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-4 bg-gray-100 shadow-sm rounded p-3 text-sm font-semibold">
          <p>No Items founded !</p>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
