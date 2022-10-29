// Codigo obtenido de https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination';
import './event.scss';

const axios = require('axios').default;

let PageSize = 25;

export default function Event() {
  const [data, setData] = useState([]);
  const [worker, setWorker] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("No disponible");

  const handleWorker = (item) => {
    const new_worker = {
      "id_event": item.id,
      "id_user": 1,
      "latitud": item.lat,
      "longitud": item.lon
    }
    axios.post('http://localhost:3000/workers/new', new_worker)
    .then((response) => {
      setWorker(new_worker);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        const res_data = response['data'];
        setData(res_data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData().catch(console.error);
  }, [worker]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/workers/');
        if (response['data'] == true) {
          setActive("Disponible");
        } else {
          setActive("No disponible");
        }
      } catch (error) {
        setActive("No disponible");
        console.log(error.response);
      }
    }
    getStatus().catch(console.error);
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  
  return (
    <>
      <h3>Servicio de workers: {active}</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo de evento</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Locación</th>
            <th>Mensaje</th>
            <th>Nivel</th>
            <th>Coeficiente</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            if (item.Jobs.length == 0) {
              item.coef = "No calculado";
            } else if (item.Jobs[0]["resultado"] == -1) {
              item.coef = "Pendiente";
            } else {
              item.coef = item.Jobs[0]["resultado"];
            }
            return (
              <TableRow key={item.id} item={item} handleWorker={handleWorker} />
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

function TableRow({ item, handleWorker }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.event_type}</td>
      <td>{item.lat}</td>
      <td>{item.lon}</td>
      <td>{item.location}</td>
      <td>{item.message}</td>
      <td>{item.level}</td>
      <td>{item.coef}</td>
      <td><button onClick={() => handleWorker(item)}>Calcular</button></td>
    </tr>
  );
}