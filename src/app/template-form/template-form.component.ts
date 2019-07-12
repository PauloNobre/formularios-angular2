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

  consultaCEP(cep) {
    console.log(cep);
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      const validaCEP = /^[0-9]{8}$/;

      if (validaCEP.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json())
          .subscribe(
            dados => console.log(dados));
      }
    }
  }
}
