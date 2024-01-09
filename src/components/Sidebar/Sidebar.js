// components/Sidebar.js

import React  , {useState} from 'react';
import './Sidebar.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown , faWallet } from '@fortawesome/free-solid-svg-icons';



const Sidebar = () => {
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  

  const toggleTabs = () => {
    setIsTabsVisible(!isTabsVisible);
  }

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="sidebar-container">
      <div className="store-info">
        {/* Store logo and name */}
        <img src={require("../../images/grocery_store.png")} alt="" />


        <div className="store-details">
          <h6>GenStore</h6>

          <a href="/" className="visit-store-link">
            Visit Store
          </a>
        </div>
        <div className="toggle-arrows" onClick={toggleTabs}>
{isTabsVisible ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
      </div>
      {isTabsVisible && (
      <div className="tabs">
                 {Array(12)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={`tab ${activeTabIndex === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {index === 0 ? (
                  <i className="fas fa-home"></i>
                ) : index === 1 ? (
                  <i className="fas fa-shopping-cart"></i>
                ) : index === 2 ? (
                  <i className="fas fa-box"></i>
                ) : index === 3 ? (
                  <i className="fas fa-truck"></i>
                ) : index === 4 ? (
                  <i className="fas fa-bullhorn"></i>
                ) : index === 5 ? (
                  <i className="fas fa-chart-bar"></i>
                ) : index === 6 ? (
                  <i className="fas fa-money-bill-wave"></i>
                ) : index === 7 ? (
                  <i className="fas fa-wrench"></i>
                ) : index === 8 ? (
                  <i className="fas fa-percent"></i>
                ) : index === 9 ? (
                  <i className="fas fa-users"></i>
                ) : index === 10 ? (
                  <i className="fas fa-paint-brush"></i>
                ) : index === 11 ? (
                  <i className="fas fa-puzzle-piece"></i>
                ) : null}
                <span>
                  {index === 0
                    ? 'Home'
                    : index === 1
                    ? 'Orders'
                    : index === 2
                    ? 'Products'
                    : index === 3
                    ? 'Delivery'
                    : index === 4
                    ? 'Marketing'
                    : index === 5
                    ? 'Analytics'
                    : index === 6
                    ? 'Payments'
                    : index === 7
                    ? 'Tools'
                    : index === 8
                    ? 'Discounts'
                    : index === 9
                    ? 'Audience'
                    : index === 10
                    ? 'Appearance'
                    : index === 11
                    ? 'Plugins'
                    : null}
                </span>
              </div>
            ))}
        </div>
      
      )}

     <div className="bottom-info">
        <div className="wallet-info">
          {/* Wallet icon */}
          <FontAwesomeIcon icon={faWallet} />
          <div className="credit-info">
            <p>Available Credits</p>
            <p>200</p>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Sidebar;
