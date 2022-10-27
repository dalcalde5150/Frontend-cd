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

  const handleWorker = async (item) => {
    const worker = {
      "id_evento": item.id,
      "id_usuario": 1,
      "mail_usuario": "example@gmail.com",
      "latitud": item.lat,
      "longitud": item.lon
    }
    setWorker(worker);
    try {
      const response = await axios.post('http://localhost:3000/workers/new', {
        "id_evento": worker['id_evento'],
        "id_usuario": worker['id_usuario'],
        "mail_usuario": worker['mail_usuario'],
        "latitud": worker['latitud'],
        "longitud": worker['longitud']
      });
      console.log(response);
      
    } catch (error) {
      console.log(error.response);
    }

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
  }, []);

    const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  
  return (
    <>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
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
      <td><button onClick={() => handleWorker(item)}>Calcular</button></td>
    </tr>
  );
}
/*
async function getData() {
  try {
    const response = await axios.get('https://e0carlosgarces.tk:445/event');
    console.log(response);
    return response['data'];
  } catch (error) {
    console.log(error.response);
  }
};

let PageSize = 25;

export default async function Event() {
  const [currentPage, setCurrentPage] = useState(1);
  let data = await getData();
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
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
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.event_type}</td>
                <td>{item.lat}</td>
                <td>{item.lon}</td>
                <td>{item.location}</td>
                <td>{item.message}</td>
                <td>{item.level}</td>
              </tr>
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
*/