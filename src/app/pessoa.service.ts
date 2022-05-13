import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService {
  apiURL: string =
    'https://crudcrud.com/api/f37eee7febfa431bb3e72b37c2d9bd2e/pessoa';

  constructor(public httpClient: HttpClient) {}

  obterTodasPessoas() {
    return this.httpClient.get(this.apiURL);
  }

  salvarPessoa(pessoa: any) {
    return this.httpClient.post(this.apiURL, pessoa);
  }

  removerPessoa(id: string) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }
}
