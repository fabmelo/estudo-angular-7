// Angular
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Model
import { Entry } from './../shared/entry.model';

// Service
import { EntryService } from './../shared/entry.service';

// FontAwesome
import { faChevronCircleLeft, faSave, faBomb } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs/operators';

// Others
import toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  // FontAwesome
  faChevronCircleLeft = faChevronCircleLeft;
  faSave = faSave;
  faBomb = faBomb;

  // Configs Initials
  currentAction: string;
  form: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuild: FormBuilder
  ) {}

  // =======================================================================================
  // =================================== LIFE CYCLE HOOKS ==================================
  // =======================================================================================

  /**
   * Life cycle hooks ngOnInit faz chamada dos métodos setCurrentAction(), createForm() e loadEntry()
   * @returns void
   */
  ngOnInit(): void {
    this.setCurrentAction();
    this.createForm();
    this.loadEntry();
  }

  /**
   * Life cycle hooks ngAfterContentChecked faz chamada do método setPageTitle()
   * @returns void
   */
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // =======================================================================================
  // =================================== PUBLIC METHODS ====================================
  // =======================================================================================

  /**
   * Executa a ação de enviar os dados do formulário para o back-end
   * @returns void
   */
  onSubmit(): void {
    this.submittingForm = true;
    this.currentAction === 'new' ? this.onCreate() : this.onUpdate();
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  // =======================================================================================
  // =================================== PRIVATE METHODS ===================================
  // =======================================================================================

  /**
   * Define o título da página
   * @returns void
   */
  private setPageTitle(): void {
    const entryName = this.entry.name || '';
    this.pageTitle =
      this.currentAction === 'new'
        ? 'Cadastro de Novo Lançamento'
        : `Edição do Lançamento ${entryName}`;
  }

  /**
   * Carrega os dados no formulário em caso de edição
   * @returns void
   */
  private loadEntry(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(switchMap(params => this.entryService.getById(+params.get('id'))))
        .subscribe(
          (entry: Entry) => {
            this.entry = entry;
            this.form.patchValue(entry);
          },
          (err: Error) => {
            toastr.error(`Erro: ${err.message}`);
          }
        );
    }
  }

  /**
   * Cria o formulário
   * @returns void
   */
  private createForm(): void {
    this.form = this.formBuild.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  /**
   * Seta a ação atual, novo ou edição
   * @returns void
   */
  private setCurrentAction(): void {
    this.currentAction = this.route.snapshot.url[0].path === 'new' ? 'new' : 'edit';
  }

  /**
   * Executa a chamada ao back-end para a atualização de um registro
   * @returns void
   */
  private onUpdate(): void {
    // trata o valor do formulário
    const entry: Entry = Object.assign(new Entry(), this.form.value);
    this.entryService
      .update(entry)
      .subscribe(res => this.actionsForSuccess(res), err => this.actionsForError(err));
  }

  /**
   * Executa a chama ao back-end para a inserção de novo registro
   */
  private onCreate(): void {
    // trata o valor do formulário
    const entry: Entry = Object.assign(new Entry(), this.form.value);
    this.entryService
      .create(entry)
      .subscribe(res => this.actionsForSuccess(res), err => this.actionsForError(err));
  }

  /**
   * Retorna a mensagem de erro tratada
   * @param err: any
   * @returns void
   */
  private actionsForError(err: any): void {
    toastr.error('Erro na requisição!');
    this.submittingForm = false;
    this.serverErrorMessages =
      err.status === 422 ? JSON.parse(err._body).errors : ['Erro de comunicação com o servidor'];
  }

  /**
   * Retorna a mensagem de sucesso tratada e faz os devidos redirecionamentos pelas rotas
   * @param res: Entry
   * @returns void
   */
  private actionsForSuccess(res: Entry): void {
    toastr.success('Sucesso na requisição!');
    this.router
      .navigateByUrl('entries', { skipLocationChange: true })
      .then(() => this.router.navigate(['entries', res.id, 'edit']));
  }
}
