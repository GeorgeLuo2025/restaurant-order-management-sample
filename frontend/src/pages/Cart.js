// Cart.jsx
function Cart({ items, onUpdateQuantity, total }) {
    return (
      <>
        {items.length === 0 ? (
          <p>购物车为空</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="d-flex justify-content-between mb-3">
                <div>
                  <h6>{item.name}</h6>
                  <div className="input-group">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={item.quantity}
                      onChange={(e) => 
                        onUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                      min="1"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <div>¥{item.price} x {item.quantity}</div>
                  <div>¥{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>总计：</span>
              <span>¥{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-success w-100 mt-3">
              提交订单
            </button>
          </>
        )}
      </>
    );
  }
  
  export default Cart;