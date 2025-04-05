// Menu.jsx
function Menu({ items, cartItems, onQuantityChange }) {
  return (
    <div className="row mt-4">
      {items.map(item => {
        const cartItem = cartItems.find(i => i.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span>¥{item.price}</span>
                  <div className="d-flex align-items-center gap-2">
                    <div className="input-group" style={{ width: '130px' }}>
                      <button
                        className="btn btn-outline-secondary py-1"
                        onClick={() => onQuantityChange(item.id, quantity - 1)}
                        disabled={quantity === 0}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center px-2"
                        value={quantity}
                        onChange={(e) => 
                          onQuantityChange(item.id, e.target.value)
                        }
                        min="0"
                      />
                      <button
                        className="btn btn-outline-secondary py-1"
                        onClick={() => onQuantityChange(item.id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;