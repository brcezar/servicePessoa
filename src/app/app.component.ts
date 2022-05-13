import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  marcar: string;

  // pessoaFormGroup = new FormGroup({
  //   nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   idade: new FormControl(null, [
  //     Validators.required,
  //     Validators.min(0),
  //     Validators.max(150),
  //   ]),
  // });

  pessoaFormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    idade: [
      null,
      [Validators.required, Validators.min(0), Validators.max(150)],
    ],
  });

  //nome: string = 'valor inicial';
  //idade: number;

  buttonLoading: boolean;

  pessoas: any[] = [];

  constructor(public pessoaService: PessoaService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  getErrorMessage(control) {
    if (control.errors) {
      switch (Object.keys(control.errors)[0]) {
        case 'required':
          return 'Campo requerido';
        case 'minlength':
          return `Tamanho mínimo é de ${control.errors.minlength.requiredLength} e o tamanho atual é ${control.errors.minlength.actualLength}`;
        case 'max':
          return `Valor maximo é de ${control.errors.max.max} `;
        case 'min':
          return `Valor mínimo é de ${control.errors.min.min} `;
        default:
          return null;
      }
    }
    return null;
  }

  carregarPessoas() {
    this.pessoaService.obterTodasPessoas().subscribe((result: any[]) => {
      this.pessoas = result;
      this.buttonLoading = false;
    });
  }

  adicionar() {
    this.buttonLoading = true;
    this.pessoaService
      .salvarPessoa(this.pessoaFormGroup.value)
      .subscribe((result) => {
        this.carregarPessoas();
      });

    this.pessoaFormGroup.reset();
  }

  remover(id: string) {
    this.pessoaService.removerPessoa(id).subscribe({
      next: (body) => {
        this.carregarPessoas();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
