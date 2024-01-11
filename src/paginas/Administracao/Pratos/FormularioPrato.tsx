import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import http from "../../../http"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"
import IPrato from "../../../interfaces/IPrato"

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const parametros = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        http.get<{ tags: ITag[] }>('tags/')
            .then( resposta => setTags(resposta.data.tags))

        http.get<IRestaurante[]>('restaurantes/')
            .then( resposta => setRestaurantes(resposta.data))


    }, [])

    useEffect(() => {

        if (parametros.id) {
            http.get<IPrato>(`/pratos/${parametros.id}/`)
                .then(resposta => {

                    setNomePrato(resposta.data.nome)
                    setDescricao(resposta.data.descricao)
                    setTag(resposta.data.tag)
                    setRestaurante(resposta.data.restaurante.toString())

                })
        }

    }, [parametros])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
            
        } else {
            setImagem(null)
        } 

    }

    const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante.toString())
        if (!parametros.id && imagem) {
            formData.append('imagem', imagem)
        }
        
        const url = parametros.id
        ? `pratos/${parametros.id}/`
        :'pratos/'

        const method = parametros.id
        ? 'PUT'
        : 'POST'

        http.request({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {

                if (parametros.id) {

                    alert('Projeto atualizado com sucesso')

                } else {

                    setNomePrato('')
                    setDescricao('')
                    setTag('')
                    setRestaurante('')
                    setImagem(null)
                    alert('Prato cadastrado com sucesso')

                } 
                navigate('/admin/pratos/')
            })
            .catch(erro => console.log(erro))

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
                    Formulário de Prato
            </Typography>
            <Box
                sx={{ width: '100%' }} 
                component='form'
                onSubmit={aoSubmeter}
            >
                <TextField 
                    margin="dense"
                    value={nomePrato}
                    onChange={ evento => setNomePrato(evento.target.value) }
                    label='Nome do Prato' 
                    variant="standard"
                    fullWidth 
                    required
                />
                <TextField 
                    margin="dense"
                    value={descricao}
                    onChange={ evento => setDescricao(evento.target.value) }
                    label='Descricao do Prato' 
                    variant="standard"
                    fullWidth 
                    required
                />

                <FormControl 
                    margin='dense' 
                    fullWidth 
                    variant='outlined'
                >
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select 
                        labelId='select-tag' 
                        value={tag} 
                        onChange={evento => setTag(evento.target.value)}
                    >
                        {tags.map(tag => 
                            <MenuItem 
                                key={tag.id} 
                                value={tag.value}
                            >
                                {tag.value}
                            </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl 
                    margin='dense' 
                    fullWidth 
                    variant='outlined'
                >
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select 
                        labelId='select-restaurante' 
                        value={restaurante} 
                        onChange={evento => setRestaurante(evento.target.value)}
                    >
                        {restaurantes.map(restaurante => 
                            <MenuItem 
                                key={restaurante.id} 
                                value={restaurante.id}
                            >
                                {restaurante.nome}
                            </MenuItem>)}
                    </Select>
                </FormControl>

                <input 
                    type="file" 
                    onChange={evento => selecionarArquivo}
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

export default FormularioPrato