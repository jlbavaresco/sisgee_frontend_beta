import { useState, useEffect } from 'react';
import PredioContext from './PredioContext';
import Tabela from './Tabela';
import Form from './Form';
import {
    getPrediosAPI, getPredioPorCodigoAPI,
    deletePredioPorCodigoAPI, cadastraPredioAPI
} from '../../../servicos/PredioServico';
import Carregando from '../../comuns/Carregando';

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            sigla: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getPredioPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPredioAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaPredios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPredios = async () => {
        setCarregando(true);
        setListaObjetos(await getPrediosAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deletePredioPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaPredios();
        }
    }

    useEffect(() => {
        recuperaPredios();
    }, []);

    return (
        <PredioContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaPredios,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                acaoCadastrar,
                handleChange, novoObjeto, editarObjeto
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PredioContext.Provider>
    );
}

export default Predio;