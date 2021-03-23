import React, { useState } from 'react'
import Rest from '../utilities/rest'

const baseURL = 'https://mymoney-f6880-default-rtdb.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)


const Movimentacoes = (props) => {
  const data = useGet(`movimentacoes/${props.match.params.data}`)
  const dataMeses = useGet(`meses/${props.match.params.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${props.match.params.data}`)
  const [dataPatch, patch] = usePatch()
  const [removeData, remove] = useDelete()
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = (evt) => {
    setValor(evt.target.value)
  }

  const salvarMovimentacao = async () => {
    if (descricao !== '' && valor !== '' && !isNaN(valor)) {
      await salvar({
        descricao,
        valor
      })
      setDescricao('')
      setValor(0.0)
      data.refetch()
      dataMeses.refetch()
    } else {
      return (
        alert('Preencha os campos corretamente antes de adicionar no banco de dados.')
      )
    }
  }

  const removerMovimentacao = async (id) => {
    await remove(`movimentacoes/${props.match.params.data}/${id}`)
    data.refetch()
    dataMeses.refetch()
  }

  const alterarPrevisaoDeEntrada = (evt) => {
    patch(`meses/${props.match.params.data}`, { previsao_entrada: evt.target.value })
  }

  const alterarPrevisaoDeSaida = (evt) => {
    patch(`meses/${props.match.params.data}`, { previsao_saida: evt.target.value })
  }

  return (
    <div className='container'>
      <h2 className='mt-5'>Movimentações {props.match.params.data}</h2>
      {
        !dataMeses.loading && dataMeses.data && 
          <div>
            <strong>Previsão de entrada:</strong> {dataMeses.data.previsao_entrada} <input type='number' onBlur={alterarPrevisaoDeEntrada} />
            <br />
            <strong>Previsão de saída:</strong> {dataMeses.data.previsao_saida} <input type='number' onBlur={alterarPrevisaoDeSaida} />
            <br />
            <strong>Entradas:</strong> {dataMeses.data.entradas}
            <br />
            <strong>Saídas:</strong> {dataMeses.data.saidas}
            <br />
        </div>
      }
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao} >
                    <td>{data.data[movimentacao].descricao}</td>
                    <td className='text-aling-rigth'>{data.data[movimentacao].valor}</td>
                    <td><button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)} >Remover</button></td>
                  </tr>
                )
              })
          }
          <tr>
            <td>
              <input type='text' className='form-control w-50' value={descricao} onChange={onChangeDescricao} />
            </td>
            <td>
              <input type='number' className='form-control w-50' value={valor} onChange={onChangeValor} />
            </td>
            <td>
              <button className='btn btn-primary' onClick={() => salvarMovimentacao()}>Adicionar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes