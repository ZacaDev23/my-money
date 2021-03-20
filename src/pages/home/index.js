import React from 'react'
import Table from '../../elements/Table'
import AdicionaMes from '../../elements/AdicionaMes'
import Rest from '../../utilities/rest'

const baseURL = 'https://mymoney-f6880-default-rtdb.firebaseio.com/'
const { useGet } = Rest(baseURL)

  //const [postData, post] = usePost('movimentacoes/2019-08')
  //const [deleteData, remove] = useDelete('movimentacoes/2019-08')

  //const saveNew = () => {
    //post({ valor: 10, descricao: 'olá' })
  //}

  //const doRemove = () => {
    //remove('movimentacoes/2019-08')
  //}

const Home = () => {
  const data = useGet('meses')
  return (
    <div className='container'>
      <AdicionaMes />
      <Table data={data}/>
    </div>
  )
}

export default Home