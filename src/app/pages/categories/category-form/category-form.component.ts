// Angular
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Model
import { Category } from './../shared/category.model';

// Service
import { CategoryService } from './../shared/category.service';

// FontAwesome
import { faChevronCircleLeft, faSave, faBomb } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs/operators';

// Others
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
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
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuild: FormBuilder
  ) {}

  // =======================================================================================
  // =================================== LIFE CYCLE HOOKS ==================================
  // =======================================================================================

  /**
   * Life cycle hooks ngOnInit faz chamada dos métodos setCurrentAction(), createForm() e loadCategory()
   * @returns void
   */
  ngOnInit(): void {
    this.setCurrentAction();
    this.createForm();
    this.loadCategory();
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
    const categoryName = this.category.name || '';
    this.pageTitle =
      this.currentAction === 'new'
        ? 'Cadastro de Nova Categoria'
        : `Edição da Categoria ${categoryName}`;
  }

  /**
   * Carrega os dados no formulário em caso de edição
   * @returns void
   */
  private loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(switchMap(params => this.categoryService.getById(+params.get('id'))))
        .subscribe(
          (category: Category) => {
            this.category = category;
            this.form.patchValue(category);
          },
          (err: Error) => {
            console.error('Erro: ', err.message);
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
      description: [null, [Validators.required, Validators.minLength(2)]]
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
    const category: Category = Object.assign(new Category(), this.form.value);
    this.categoryService
      .update(category)
      .subscribe(res => this.actionsForSuccess(res), err => this.actionsForError(err));
  }

  /**
   * Executa a chama ao back-end para a inserção de novo registro
   */
  private onCreate(): void {
    // trata o valor do formulário
    const category: Category = Object.assign(new Category(), this.form.value);
    this.categoryService
      .create(category)
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
   * @param res: Category
   * @returns void
   */
  private actionsForSuccess(res: Category): void {
    toastr.success('Sucesso na requisição!');
    this.router
      .navigateByUrl('categories', { skipLocationChange: true })
      .then(() => this.router.navigate(['categories', res.id, 'edit']));
  }
}
