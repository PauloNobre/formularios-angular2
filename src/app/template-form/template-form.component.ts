import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
  }

  verificaInvalidTouched(campo) {
    return campo.invalid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaInvalidTouched(campo),
      'has-feedback': this.verificaInvalidTouched(campo)
    };
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      const validaCEP = /^[0-9]{8}$/;

      if (validaCEP.test(cep)) {

        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json())
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, form) {
    /* form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    }); */

    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(form) {
    form.form.patchValue({
      endereco: {
        cep: null,
        numero: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
