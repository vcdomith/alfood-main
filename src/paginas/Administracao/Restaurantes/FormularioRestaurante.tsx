import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"


const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {

        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then( resposta => setNomeRestaurante(resposta.data.nome))
        }

    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => alert('Restaurante atualizado com sucesso!'))

        } else {
            
            http.post('restaurantes/',{
                nome: nomeRestaurante
            })
                .then( () => alert('Restaurante Cadastrado'))
        }

    }

  return (
    <>

        <Box sx={{display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'center'}}
        >
            <Typography 
                sx={{textAlign: 'left'}}
                component='h1'
                variant="h6">
                    Formulário de Restaurantes
            </Typography>
            <Box
                sx={{ width: '100%' }} 
                component='form'
                onSubmit={aoSubmeter}
            >
                <TextField 
                    sx={{marginTop: 1}}
                    value={nomeRestaurante}
                    onChange={ evento => setNomeRestaurante(evento.target.value) }
                    label='Nome do Restaurante' 
                    variant="standard"
                    fullWidth 
                    required
                />
                <Button 
                    sx={{marginTop: 1}}
                    type="submit" 
                    variant="outlined"
                    fullWidth
                >
                    Salvar
                </Button>
            </Box>
        </Box>

    </>
  )
}

export default FormularioRestaurante