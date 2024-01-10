import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  // const restaurantes: IRestaurante[] = [
  //   {
  //     id: 1,
  //     nome: "Lyllys Cafe",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Lasanha à Bolonhesa',
  //         imagem: 'https://receitassaborosa.com/wp-content/uploads/2019/12/Lasanha-com-Molho-a-Bolonhesa.jpg',
  //         nome: 'Lasanha',
  //         restaurante: 1,
  //         tag: 'Italiana'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Strogonoff de Frango à brasileira',
  //         imagem: 'https://img.itdg.com.br/images/recipes/000/002/462/332854/332854_original.jpg',
  //         nome: 'Strogonoff',
  //         restaurante: 1,
  //         tag: 'Russa'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Empadão de Frango',
  //         imagem: 'https://t1.uc.ltmcdn.com/pt/images/5/7/1/img_como_fazer_empadao_de_frango_27175_600.jpg',
  //         nome: 'Empadão de Frango',
  //         restaurante: 1,
  //         tag: 'Portuguesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: "Sugiro Sushi",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Combinado de 8 peças',
  //         imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
  //         nome: 'Sushi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Sashimi de Salmão',
  //         imagem: 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
  //         nome: 'Sashimi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: "Cantina da Escola",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Salgado de queijo com presunto',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/102/312/279767/279767_original.jpg',
  //         nome: 'Quejunto',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Coxinha de Frango',
  //         imagem: 'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
  //         nome: 'Coxinha',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Risole de Palmito',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/005/116/323871/323871_original.jpg',
  //         nome: 'Risole',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       }
  //     ]
  //   }
  // ]

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  useEffect(() => {

    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {

        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)

      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const verMais = () => {

    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(resposta => {

      setRestaurantes([...restaurantes, ...resposta.data.results])
      setProximaPagina(resposta.data.next)

    })
    .catch(error => {
      console.log(error);
    })

  }

  const irProximaPagina = () => {

    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then( resposta => {

        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)

      }) 

  }

  const irPaginaAnterior = () => {

    axios.get<IPaginacao<IRestaurante>>(paginaAnterior)
      .then( resposta => {

        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)

      }) 

  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {/* {proximaPagina&& <button onClick={verMais}>Ver mais</button>} */}
    {proximaPagina&& <button onClick={irProximaPagina}>Próxima Página</button>}
    {paginaAnterior&& <button onClick={irPaginaAnterior}>Página Anterior</button>}
  </section>)
}

export default ListaRestaurantes