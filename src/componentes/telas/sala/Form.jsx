import { useContext } from 'react'
import Alerta from '../../Alerta';
import SalaContext from './SalaContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
function Form() {

    // funçao para usar na validação de campos com bootstrap
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    const { objeto, handleChange, acaoCadastrar, alerta, listaPredios } = useContext(SalaContext);

    return (

        <Dialogo id="modalEdicao" titulo="Sala"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada value={objeto.codigo}
                id="txtCodigo" name="codigo" label="Código"
                tipo="number" onchange={handleChange}
                msgvalido="" msginvalido=""
                requerido={false} readonly={true}
                maxCaracteres={5} />
            <CampoEntrada value={objeto.numero}
                id="txtNumero" name="numero" label="Numero"
                tipo="number" onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe o número"
                requerido={true} readonly={false}
                maxCaracteres={10} />
            <CampoEntrada value={objeto.descricao}
                id="txtDescricao" name="descricao" label="Descrição"
                tipo="text" onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe a descrição"
                requerido={true} readonly={false}
                maxCaracteres={40} />
            <CampoEntrada value={objeto.capacidade}
                id="txtCapacidade" name="capacidade" label="Capacidade"
                tipo="number" onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe a capacidade"
                requerido={true} readonly={false}
                maxCaracteres={10} />
            <CampoSelect value={objeto.predio}
                id="txtPredio" name="predio" label="Prédio"
                onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe o prédio"
                requerido={true}
            >
                {listaPredios.map((pre) => (
                    <option key={pre.codigo} value={pre.codigo}>
                        {pre.nome}
                    </option>
                ))}
            </CampoSelect>
        </Dialogo>

    )
}

export default Form;