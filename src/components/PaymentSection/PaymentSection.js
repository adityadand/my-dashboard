// PaymentSection.js
import React , { useState, useEffect , useRef  } from 'react';
import './PaymentSection.css';
import { BsArrowUpShort, BsArrowDownShort,BsDownload } from 'react-icons/bs';
import sampleData from '../../data/data.json';
import jsPDF from 'jspdf';

const ROW_LIMIT = 12; // Set the row limit

const PaymentSection = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const tableRef = useRef(null);
  const [isSorted, setIsSorted] = useState(false);

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  if (isSorted) {
    setData([...data].sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate)));
  } else {
    // Reset to original data (assuming you have a reference to it)
    setData(sampleData);
  }
};


  useEffect(() => {
    // Fetch data from the JSON file
    setData(sampleData);
  }, []);

  useEffect(() => {
    // Assign the tableRef.current after the component has rendered
    tableRef.current = document.querySelector('.data-table');
  }, [data]); // Update ref when data changes

  const filteredData = data
    .filter((row) => row.id.toString().includes(searchQuery.toLowerCase()))


  // Calculate the number of pages
  const totalPages = Math.ceil(filteredData.length / ROW_LIMIT);

  // Generate an array of page numbers between Previous and Next buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle changing the current page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handleDownload = () => {
    if (!tableRef.current) {
      console.error('Table reference is not assigned properly');
      return;
    }

  
    const pdf = new jsPDF();

    pdf.text(`Order Details - Page ${currentPage}`, 20, 10);
  
    // Iterate through all rows, adding them to the PDF without pagination
    const rows = tableRef.current.querySelectorAll('.table-row');
    let yPosition = 20; // Initial y-position for content
  
    rows.forEach((row, index) => {
      const rowData = Array.from(row.children).map((cell) => cell.textContent.trim());
      pdf.text(rowData.join(' | '), 20, yPosition);
      yPosition += 10; // Adjust y-position for the next row
    });
  
    // Save the PDF
    pdf.save('order_details.pdf');
  };
  
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  


  return (
    <div className="payment-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="payment-text">Payment</div>
        <div className="how-it-works">How it works</div>
        <input type="text" className="search-bar" placeholder="Search featured , tutorials , etc." />
        <div className="chat-icon"></div>
        <div className="down-triangle-icon"></div>
      </div>

      {/* Overview Section */}
      <div className="overview-section">
        <h2>Overview</h2>
        <select className="dropdown">
            <option>Last Month</option>
            {/* Add more options if needed */}
          </select>
      </div>

      {/* Online Order Section */}
      <div className="online-order-section">
          <div className="creme-rectangle">
            <div className="order-line">Online Orders</div>
            <div className="order-number">938</div>
          </div>
    

      <div className="creme-rectangle">
            <div className="amount-rec">Amount Received</div>
            <div className="amount">₹69,43,666,224.40</div>
        </div>
        </div>
   

      {/* Transactions Section */}
      <div className="transactions-section">
        <h3>Transactions | This Month</h3>
        <div className="search-and-icons">
        <input type="text" className="order-search" placeholder="Search By Order IDs"
             value={searchQuery}
             onChange={handleSearchChange}
        />
        <div className="icon-container">
        <div
        className="sort-icon"
        onClick={handleSortClick}
      >
        Sort by Date {isSorted ? <BsArrowDownShort /> : <BsArrowUpShort />}
      </div>
      <div className="download-icon" onClick={handleDownload}><BsDownload /></div>
      </div>
    </div>

    <div className="data-table">
  {/* Table Head */}
  <div className="table-head">
    <div className="table-header">Order ID</div>
    <div className="table-header">Order Date</div>
    <div className="table-header">Order Amount</div>
    <div className="table-header transaction-fees">Transaction Fees
    <i className="info-icon">i</i>
    <div class="info-text">Some information text here</div>
    </div>
  </div>

  {/* Table Rows (Use static data) */}
  {filteredData.slice((currentPage - 1) * ROW_LIMIT, currentPage * ROW_LIMIT).map((row) => (
          <div className="table-row" key={row.id}>
           <div>
            <a href={`#order-${row.id}`} className="table-link">
           #{row.id}
            </a>
            </div>
            <div>{formatDate(row.orderDate)}</div>
            <div>{row.orderAmount}</div>
            <div>{row.transactionFees}</div>
          </div>
  ))}

  {/* Add more rows as needed */}
</div>

        {/* Navigation Buttons */}
  {/* Navigation Buttons */}
  <div className="navigation-buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt; Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>
    </div>
    </div>
  );
};

export default PaymentSection;
