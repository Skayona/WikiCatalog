import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent {
  @Input() id: number;

  @Output() deleteItem = new EventEmitter<number>();

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(faEdit, faTrashAlt);
  }

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
