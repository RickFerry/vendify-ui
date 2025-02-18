import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';

import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Sale } from '../../models/sale';
import { BASE_URL } from '../../utils/request';
import NotificationButton from '../notification-button';

function SalesCard() {
  const min = new Date(new Date().setDate(new Date().getDate() - 365));
  const max = new Date();

  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);
  const [sales, setSales] = useState<Sale[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentSales = sales.slice(offset, offset + itemsPerPage);

  const dmin = minDate.toISOString().slice(0, 10);
  const dmax = maxDate.toISOString().slice(0, 10);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
      .then((response) => setSales(response.data.content))
      .catch((error) => console.log("Erro ao buscar vendas: " + error));
  }, [minDate, maxDate, dmin, dmax]);

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {currentSales.map((sale) => (
              <tr key={sale.id}>
                <td className="show992">{sale.id}</td>
                <td className="show576">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td>{sale.sellerName}</td>
                <td className="show992">{sale.visited}</td>
                <td className="show992">{sale.deals}</td>
                <td>{sale.amount.toFixed(2)}</td>
                <td>
                  <NotificationButton saleId={sale.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(sales.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default SalesCard;
