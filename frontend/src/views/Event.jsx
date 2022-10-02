// Codigo obtenido de https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import './event.scss';

const axios = require('axios').default;


async function getData() {
  try {
    const response = await axios.get('http://e0carlosgarces.tk:3000/event');
    console.log('funciona');
    console.log(response);
    return response
  } catch (error) {
    console.log(error.response);
  }
};

const data = getData();

/*
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });*/

let PageSize = 25;

export default function Event() {
  const [currentPage, setCurrentPage] = useState(1);

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
