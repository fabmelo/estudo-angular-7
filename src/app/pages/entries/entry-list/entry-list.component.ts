// Angular
import { OnInit, Component } from '@angular/core';

// Model
import { Entry } from './../shared/entry.model';

// Service
import { EntryService } from './../shared/entry.service';

// Others
import toastr from 'toastr';

// FontAwesome
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faThumbsDown,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  // FontAwesome
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;

  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.onGetAll();
  }

  /**
   * Carrega todos os registros
   * @returns void
   */
  onGetAll(): void {
    this.entryService.getAll().subscribe(
      (entries: Entry[]) => {
        this.entries = entries.sort((a, b) => b.id - a.id);
      },
      (err: Error) => {
        toastr.error(`Erro: ${err.message}`);
      }
    );
  }

  /**
   * Exclui um registro
   * @param entry: Entry
   * @returns void
   */
  onDelete(entry: Entry): void {
    const shouldDelete = confirm('Deseja realmente excluir este registro?');

    if (shouldDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => {
          // tslint:disable-next-line: no-shadowed-variable
          this.entries = this.entries.filter(element => element !== entry);
          toastr.success('Successo');
        },
        (err: Error) => {
          toastr.error(`Erro: ${err.message}`);
        }
      );
    }
  }
}
