import React, { useState, useRef, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const minAno = 2019
const maxAno = 2025
const AdicionaMes = () => {
  const refAno = useRef()
  const refMes = useRef()
  const [redir, setRedir] = useState('')
  const anos = []
  const meses = []
  for(let i = minAno; i <= maxAno; i++){
    anos.push(i)
  }
  for(let i = 1; i <= 12; i++){
    meses.push(i)
  }
  const zeroNum = num => {
    if(num <= 9 && num >=0){
      return '0'+ num
    }else{
      return num
    }
  }

  const verMes = () => {
    setRedir(refAno.current.value + '-' + refMes.current.value)
  }

  if(redir !== ''){
    return <Redirect to={`movimentacoes/${redir}`} />
  }
  
  return (
    <Fragment>
      <h2 className='mt-5'>Adicionar Mês</h2>
      <select className='m-1' ref={refAno}>
        { anos.map(ano => <option  key={ano} value={ano}>{ano}</option> )}
      </select>
      <select className='m-1' ref={refMes}>
        { meses.map(zeroNum).map(mes => <option key={mes} value={mes}>{mes}</option>)}
      </select>
      <button className='btn btn-dark m-1' onClick={() => verMes()}>Adicionar Mês</button>
    </Fragment>
  )
}

export default AdicionaMes