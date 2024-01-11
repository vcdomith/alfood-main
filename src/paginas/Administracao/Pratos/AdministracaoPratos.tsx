import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { Link } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {

        axios.get<IPrato[]>('http://localhost:8000/api/v2/pratos/')
            .then( resposta => setPratos(resposta.data) )

    }, [])

    const excluirPrato = (pratoExcluir: IPrato) => {
        axios.delete(`http://localhost:8000/api/v2/pratos/${pratoExcluir.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(prato => prato.id !== pratoExcluir.id)

                setPratos([ ...listaPrato ])
            })
    }

  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Nome
                    </TableCell>
                    <TableCell>
                        Descricao
                    </TableCell>
                    <TableCell>
                        Tag
                    </TableCell>
                    <TableCell>
                        Imagem
                    </TableCell>
                    <TableCell>
                        Editar
                    </TableCell>
                    <TableCell>
                        Excluir
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pratos.map( prato => 
                    <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.descricao}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            <a 
                                href={prato.imagem} 
                                target='_blank' rel="noreferrer"  
                            >Ver imagem</a>
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => excluirPrato(prato)}
                            >
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>

  )
}

export default AdministracaoPratos