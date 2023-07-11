import { useContext } from 'react'
import SalaContext from './SalaContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { alerta, setAlerta, listaObjetos, remover, novoObjeto, editarObjeto, recuperarEquipamentos } = useContext(SalaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Salas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhuma sala encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Capacidade</th>
                            <th scope="col">Prédio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button className="btn btn-success" title="Equipamentos"
                                        onClick={() => {
                                            recuperarEquipamentos(objeto.codigo);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pc-display"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.numero}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.capacidade}</td>
                                <td>{objeto.nomepredio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;