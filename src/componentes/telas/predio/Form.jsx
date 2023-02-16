import { useContext } from 'react'
import Alerta from '../../Alerta';
import PredioContext from './PredioContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

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

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(PredioContext);

    return (
  
            <Dialogo id="modalEdicao" titulo="Prédio"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
                <Alerta alerta={alerta} />
                <CampoEntrada value={objeto.codigo}
                    id="txtCodigo" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    msgvalido="" msginvalido=""
                    requerido={false} readonly={true}
                    maxCaracteres={5} />
                <CampoEntrada value={objeto.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o nome"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
                <CampoEntrada value={objeto.descricao}
                    id="txtDescricao" name="descricao" label="Descrição"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a descrição"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
                <CampoEntrada value={objeto.sigla}
                    id="txtSigla" name="sigla" label="Sigla"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a sigla"
                    requerido={true} readonly={false}
                    maxCaracteres={4} />
            </Dialogo>
    
    )
}

export default Form;