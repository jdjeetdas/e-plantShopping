import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ onCartClick, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
        { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
        { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
        { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114339_1280.jpg', description: 'Adds humidity and removes toxins from the air.', cost: '$20' },
        { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/01/05/03/rubber-plant-4809288_1280.jpg', description: 'Easy to care for and effective at purifying air.', cost: '$17' },
        { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283498_1280.jpg', description: 'Purifies air and has medicinal healing properties.', cost: '$14' },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        { name: 'Lavender', image: 'https://cdn.pixabay.com/photo/2019/10/01/17/03/lavender-4518865_1280.jpg', description: 'Calming fragrance, used in aromatherapy.', cost: '$20' },
        { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2019/07/21/22/31/jasmine-4353498_1280.jpg', description: 'Sweet fragrance, popular in perfumes.', cost: '$18' },
        { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Aromatic herb used in cooking and therapy.', cost: '$15' },
        { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2018/05/07/20/46/mint-3381216_1280.jpg', description: 'Refreshing scent, great for teas and dishes.', cost: '$12' },
        { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/lemon-balm-4480250_1280.jpg', description: 'Citrusy aroma, helps reduce stress.', cost: '$14' },
        { name: 'Eucalyptus', image: 'https://cdn.pixabay.com/photo/2016/01/25/18/28/eucalyptus-1161635_1280.jpg', description: 'Invigorating scent with medicinal uses.', cost: '$22' },
      ],
    },
    {
      category: 'Insect Repellent Plants',
      plants: [
        { name: 'Citronella', image: 'https://cdn.pixabay.com/photo/2015/01/09/11/08/flower-594723_1280.jpg', description: 'Natural mosquito repellent with lemony scent.', cost: '$16' },
        { name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/09/13/06/15/marigold-7451028_1280.jpg', description: 'Repels mosquitoes and other garden pests.', cost: '$10' },
        { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/01/13/15/48/basil-1138587_1280.jpg', description: 'Repels flies and mosquitoes naturally.', cost: '$12' },
        { name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/07/05/13/17/catnip-832401_1280.jpg', description: 'Effective at repelling mosquitoes.', cost: '$13' },
        { name: 'Chrysanthemum', image: 'https://cdn.pixabay.com/photo/2019/10/10/17/40/chrysanthemum-4540622_1280.jpg', description: 'Contains pyrethrin, a natural insecticide.', cost: '$18' },
        { name: 'Lemongrass', image: 'https://cdn.pixabay.com/photo/2015/01/09/11/08/lemongrass-594718_1280.jpg', description: 'Strong citrus scent that repels insects.', cost: '$15' },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list-page">
      <div className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h3>Paradise Nursery</h3>
          <p>Where Green Meets Serenity</p>
        </div>
        <div className="navbar-links">
          <span onClick={onHomeClick}>Home</span>
          <span>Plants</span>
          <div className="cart-icon" onClick={onCartClick}>
            🛒
            {totalCartQuantity > 0 && (
              <span className="cart-count">{totalCartQuantity}</span>
            )}
          </div>
        </div>
      </div>

      <div className="product-grid-container">
        {plantsArray.map((category, catIndex) => (
          <div key={catIndex} className="category-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="product-cards">
              {category.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="product-card">
                  <div className="sale-badge">SALE</div>
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-cost">{plant.cost}</p>
                  <p className="product-description">{plant.description}</p>
                  <button
                    className={`add-to-cart-btn ${isInCart(plant.name) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.name)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
