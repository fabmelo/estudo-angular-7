// Angular
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Model
import { Category } from './../shared/category.model';

// Service
import { CategoryService } from './../shared/category.service';

// FontAwesome
import { faChevronCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  // FontAwesome
  faChevronCircleLeft = faChevronCircleLeft;
  faSave = faSave;

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

  ngOnInit() {
    this.setCurrentAction();
    this.createForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
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
        : `Edição de Categoria ${categoryName}`;
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
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }
}
