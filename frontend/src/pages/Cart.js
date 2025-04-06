// Cart.jsx
function Cart({ items, onUpdateQuantity, total, customerName, onCustomerNameChange, onOrderSubmission, isSubmitting}) {

    const handleSubmit = () => {
      if (items.length === 0) {
        alert('购物车为空，无法提交');
        return;
      }
      if (!customerName) {
        alert('请输入顾客姓名');
        return;
      }
      onOrderSubmission(customerName, items); // 传递参数
    };

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

            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">顾客姓名</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="请输入您的姓名"
                value={customerName}
                onChange={(e) => onCustomerNameChange(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between fw-bold">
              <span>总计：</span>
              <span>¥{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-success w-100 mt-3" onClick={(handleSubmit)} disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '提交订单'}
            </button>
          </>
        )}
      </>
    );
  }
  
  export default Cart;