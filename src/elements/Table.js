import React from 'react'
import { Link } from 'react-router-dom'

const Table = ({data}) => {
  return (

    <div className='container'>
      {
        data.loading && <span>Carregando...</span>
      }
      {
        !data.loading && (
          <table className='table table-borderless mt-5'>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Previsão de entrada</th>
                <th>Entradas</th>
                <th>Previsão de saída</th>
                <th>Saídas</th>
              </tr>
            </thead>
            <tbody>
              {
                Object
                  .keys(data.data)
                  .map(mes => {
                    return (
                      <tr key={mes}>
                        <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_entrada}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_saida}</td>
                        <td>{data.data[mes].saidas}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default Table