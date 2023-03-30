import { useState, useEffect } from 'react';
import SalaContext from './SalaContext';
import Tabela from './Tabela';
import Form from './Form';
import { getPrediosAPI } from '../../../servicos/PredioServico';
import {
    getSalasAPI, getSalaPorCodigoAPI,
    deleteSalaPorCodigoAPI, cadastraSalaAPI
} from '../../../servicos/SalaServico';
import Carregando from '../../comuns/Carregando';

function Sala() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaPredios, setListaPredios] = useState([]);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        setObjeto(await getSalaPorCodigoAPI(codigo))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraSalaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaSalas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPredios = async () => {
        setListaPredios(await getPrediosAPI());
    }

    const recuperaSalas = async () => {
        setCarregando(true);
        setListaObjetos(await getSalasAPI());
        setCarregando(false);
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteSalaPorCodigoAPI(objeto.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaSalas();
        }
    }

    useEffect(() => {
        recuperaSalas();
        recuperaPredios();
    }, []);

    return (
        <SalaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaPredios,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange, listaPredios
            }
        }>
            {!carregando ? <Tabela /> : <Carregando />}
            <Form />
        </SalaContext.Provider>
    );
}

export default Sala;