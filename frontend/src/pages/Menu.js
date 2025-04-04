// Menu.jsx
function Menu({ items, onAddToCart }) {
    return (
      <div className="row mt-4">
        {items.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span>¥{item.price}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => onAddToCart(item)}
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Menu;