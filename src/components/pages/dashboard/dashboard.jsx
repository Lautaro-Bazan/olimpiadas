import React, { useState } from 'react';
import { ShoppingCart, Package, Clock, Building2, Menu, X } from 'lucide-react';
import { OrdersComponent } from './orders';
import { ProductsComponent } from './products';
import { OrderHistoryComponent } from './historicalOrders';
import { CompanyDataComponent } from './companyData';
import './dashboard.css'; 

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'orders', label: 'Órdenes', icon: ShoppingCart },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'history', label: 'Historial de Órdenes', icon: Clock },
    { id: 'company', label: 'Datos Empresa', icon: Building2 },
  ];

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersComponent />;
      case 'products':
        return <ProductsComponent />;
      case 'history':
        return <OrderHistoryComponent />;
      case 'company':
        return <CompanyDataComponent />;
      default:
        return <OrdersComponent />;
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar para 768 para arriba */}
      <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo">Admin Panel</div>
          <button 
            className={`menu-toggle${sidebarOpen ? '' : '-collapsed'}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav>
          <ul className="menu-list">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="menu-item">
                  <div
                    className={`menu-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <IconComponent className="menu-icon" size={20} />
                    <span className="menu-text">{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* navbar para 768 para abajo */}
      <div className="navbar-mobile">
        <div className="header-mobile">Admin Panel</div>

        {/* Nav solo con íconos, abajo */}
        <nav className="navbar-bottom">
          <ul className="navbar-list">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="navbar-item">
                  <div
                    className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <IconComponent className="navbar-icon" size={24} />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <main className="main-content">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

