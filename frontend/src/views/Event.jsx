// Codigo obtenido de https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination';
import './event.scss';

const axios = require('axios').default;

let PageSize = 25;

export default function Event() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://e0carlosgarces.tk:445/event');
        console.log(response);
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
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <TableRow key={item.id} item={item} />
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

function TableRow({ item }) {
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